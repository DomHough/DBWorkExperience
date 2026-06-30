import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type {
  ApiKey,
  ApiTaskProgress,
  DifficultyTag,
  PriorityTag,
  SessionTag,
  TaskDefinition,
  TaskStatus,
} from '../data/tasks'
import {
  API_OPTIONS,
  KANBAN_COLUMNS,
  TASKS_BY_API,
  loadTaskBoardState,
  saveTaskBoardState,
} from '../data/tasks'
import { GUIDES } from '../data/guides'

type ApiAvailabilityStatus = 'checking' | 'online' | 'offline'

interface ApiAvailability {
  status: ApiAvailabilityStatus
  message: string
}

const API_HEALTH_ENDPOINTS: Record<ApiKey, string> = {
  pokeapi: 'https://pokeapi.co/api/v2/pokemon?limit=1',
}

const API_HEALTH_TIMEOUT_MS = 8000

function isTaskUnlocked(task: TaskDefinition, apiProgress: ApiTaskProgress): boolean {
  if (!task.dependencies?.length) {
    return true
  }

  const completed = task.dependencies.filter(
    (dependencyId) => apiProgress[dependencyId]?.status === 'done',
  ).length

  if (task.unlockRule === 'any') {
    return completed > 0
  }

  return completed === task.dependencies.length
}

function isTaskDoneReady(task: TaskDefinition, apiProgress: ApiTaskProgress): boolean {
  const checks = apiProgress[task.id]?.checks ?? []
  return checks.length === task.acceptanceCriteria.length && checks.every(Boolean)
}

function toTitleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function sessionLabel(session: SessionTag): string {
  if (session === 'session-1') {
    return 'Session 1'
  }

  return 'Session 2+'
}

function apiOptionDescription(api: ApiKey): string {
  void api
  return 'Build a Pokemon list page, detail page, search, and filtering in guided steps.'
}

function columnDescription(status: TaskStatus): string {
  if (status === 'todo') {
    return 'Ready to pick up when you choose the next task.'
  }

  if (status === 'in-progress') {
    return 'Work that has started but still needs finishing.'
  }

  return 'Tasks that now meet the agreed acceptance criteria.'
}

function emptyColumnMessage(status: TaskStatus): string {
  if (status === 'todo') {
    return 'No tasks are waiting here at the moment.'
  }

  if (status === 'in-progress') {
    return 'Move a task here once implementation has started.'
  }

  return 'Completed tasks will collect here as work is finished.'
}

function priorityTagClass(priority: PriorityTag): string {
  void priority
  return 'rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-xs leading-none text-rose-700'
}

function difficultyTagClass(difficulty: DifficultyTag): string {
  void difficulty
  return 'rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-xs leading-none text-sky-700'
}

function sessionTagClass(session: SessionTag): string {
  if (session === 'session-1') {
    return 'rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs leading-none text-amber-700'
  }

  return 'rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs leading-none text-emerald-700'
}

function availabilityTagClass(status: ApiAvailabilityStatus): string {
  if (status === 'online') {
    return 'rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700'
  }

  if (status === 'offline') {
    return 'rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700'
  }

  return 'rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700'
}

function availabilityLabel(status: ApiAvailabilityStatus): string {
  if (status === 'online') {
    return 'Online'
  }

  if (status === 'offline') {
    return 'Unavailable'
  }

  return 'Checking'
}

function createInitialAvailabilityState(): Record<ApiKey, ApiAvailability> {
  return {
    pokeapi: { status: 'checking', message: 'Checking API availability...' },
  }
}

interface TasksPageProps {
  onSelectedApiChange?: (selectedApi: ApiKey | null) => void
}

export function TasksPage({ onSelectedApiChange }: TasksPageProps) {
  const [state, setState] = useState(() => loadTaskBoardState())
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [dragTaskId, setDragTaskId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string>('')
  const [apiAvailabilityRefreshKey, setApiAvailabilityRefreshKey] = useState(0)
  const [apiAvailability, setApiAvailability] = useState<Record<ApiKey, ApiAvailability>>(
    () => createInitialAvailabilityState(),
  )
  const [isCheckingApiAvailability, setIsCheckingApiAvailability] = useState(false)

  useEffect(() => {
    saveTaskBoardState(state)
  }, [state])

  useEffect(() => {
    onSelectedApiChange?.(state.selectedApi)
  }, [onSelectedApiChange, state.selectedApi])

  const selectedApi = state.selectedApi
  const tasks = selectedApi ? TASKS_BY_API[selectedApi] : null
  const progress = selectedApi ? state.progress[selectedApi] : null

  useEffect(() => {
    if (selectedApi) {
      return
    }

    const controllers: AbortController[] = []
    let isCancelled = false

    async function checkApiAvailability() {
      setIsCheckingApiAvailability(true)
      setApiAvailability(createInitialAvailabilityState())

      const results = await Promise.all(
        API_OPTIONS.map(async (option) => {
          const controller = new AbortController()
          const timeoutId = window.setTimeout(() => controller.abort(), API_HEALTH_TIMEOUT_MS)
          controllers.push(controller)

          try {
            const response = await fetch(API_HEALTH_ENDPOINTS[option.key], {
              signal: controller.signal,
            })

            if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`)
            }

            return [
              option.key,
              {
                status: 'online',
                message: `${option.label} responded successfully.`,
              },
            ] as const
          } catch (error) {
            const message =
              error instanceof Error && error.name === 'AbortError'
                ? `Timed out after ${API_HEALTH_TIMEOUT_MS / 1000} seconds.`
                : error instanceof Error
                  ? error.message
                  : 'Request failed.'

            return [
              option.key,
              {
                status: 'offline',
                message: `Could not reach ${option.label}: ${message}`,
              },
            ] as const
          } finally {
            window.clearTimeout(timeoutId)
          }
        }),
      )

      if (isCancelled) {
        return
      }

      setApiAvailability(Object.fromEntries(results) as Record<ApiKey, ApiAvailability>)
      setIsCheckingApiAvailability(false)
    }

    void checkApiAvailability()

    return () => {
      isCancelled = true
      for (const controller of controllers) {
        controller.abort()
      }
    }
  }, [apiAvailabilityRefreshKey, selectedApi])

  const visibleTasks = useMemo(() => {
    if (!tasks || !progress) {
      return []
    }

    return tasks.filter((task) => isTaskUnlocked(task, progress))
  }, [progress, tasks])

  const activeTask =
    activeTaskId
      ? visibleTasks.find((task) => task.id === activeTaskId) ?? null
      : null
  const relatedGuides = activeTask
    ? GUIDES.filter((guide) => activeTask.guideSlugs?.includes(guide.slug))
    : []

  function chooseApi(api: ApiKey) {
    const availability = apiAvailability[api]

    if (availability.status === 'offline') {
      setFeedback(availability.message)
      return
    }

    if (availability.status === 'checking') {
      setFeedback('API availability checks are still running. Wait for them to finish first.')
      return
    }

    setFeedback('')
    setActiveTaskId(null)
    setState((previous) => ({ ...previous, selectedApi: api }))
  }

  function updateTaskStatus(taskId: string, status: TaskStatus) {
    if (!selectedApi || !progress) {
      return
    }

    const task = TASKS_BY_API[selectedApi].find((item) => item.id === taskId)
    if (!task) {
      return
    }

    if (status === 'done' && !isTaskDoneReady(task, progress)) {
      setFeedback('Complete all acceptance criteria before moving this task to Done.')
      return
    }

    setFeedback('')
    setState((previous) => ({
      ...previous,
      progress: {
        ...previous.progress,
        [selectedApi]: {
          ...previous.progress[selectedApi],
          [taskId]: {
            ...previous.progress[selectedApi][taskId],
            status,
          },
        },
      },
    }))
  }

  function toggleAcceptance(taskId: string, criterionIndex: number) {
    if (!selectedApi) {
      return
    }

    setState((previous) => {
      const existing = previous.progress[selectedApi][taskId]
      const checks = [...existing.checks]
      checks[criterionIndex] = !checks[criterionIndex]

      return {
        ...previous,
        progress: {
          ...previous.progress,
          [selectedApi]: {
            ...previous.progress[selectedApi],
            [taskId]: {
              ...existing,
              checks,
            },
          },
        },
      }
    })
  }

  if (!selectedApi) {
    return (
      <section className="flex min-h-0 flex-1 flex-col gap-6">
        <header className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Task Setup
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Choose API Track</h1>
          <p className="max-w-3xl text-slate-700">
            Pick the API track first. The board then reveals the relevant tasks and
            keeps progress saved locally in the browser.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600">
              {isCheckingApiAvailability
                ? 'Checking that all APIs are available before students choose a track.'
                : 'API availability has been checked for each track below.'}
            </span>
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => {
                setFeedback('')
                setApiAvailabilityRefreshKey((current) => current + 1)
              }}
              disabled={isCheckingApiAvailability}
            >
              Check again
            </button>
          </div>
        </header>

        {feedback ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            {feedback}
          </p>
        ) : null}

        <div
          className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]"
          role="list"
        >
          {API_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              className="group cursor-pointer rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:hover:shadow-sm"
              onClick={() => chooseApi(option.key)}
              disabled={apiAvailability[option.key].status !== 'online'}
            >
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    API Track
                  </span>
                  <span className={availabilityTagClass(apiAvailability[option.key].status)}>
                    {availabilityLabel(apiAvailability[option.key].status)}
                  </span>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-xl font-semibold text-slate-900">{option.label}</h2>
                  <p className="text-sm leading-6 text-slate-600">
                    {apiOptionDescription(option.key)}
                  </p>
                  <p className="text-sm leading-6 text-slate-500">
                    {apiAvailability[option.key].message}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    )
  }

  const boardProgress = state.progress[selectedApi]

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-6">
      {feedback ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {feedback}
        </p>
      ) : null}

      <div className="grid flex-1 min-h-0 gap-8 md:grid-cols-3">
        {KANBAN_COLUMNS.map((column) => {
          const columnTasks = visibleTasks.filter(
            (task) => boardProgress[task.id]?.status === column.key,
          )
          const sessionGroups: Array<{ session: SessionTag; tasks: TaskDefinition[] }> = (
            [
              {
                session: 'session-1' as const,
                tasks: columnTasks.filter((task) => task.session === 'session-1'),
              },
              {
                session: 'session-2-plus' as const,
                tasks: columnTasks.filter((task) => task.session === 'session-2-plus'),
              },
            ] satisfies Array<{ session: SessionTag; tasks: TaskDefinition[] }>
          ).filter((group) => group.tasks.length > 0)

          return (
            <section
              key={column.key}
              className="flex min-h-[16rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:min-h-0"
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragTaskId) {
                  updateTaskStatus(dragTaskId, column.key)
                }
                setDragTaskId(null)
              }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="grid gap-1">
                  <h2 className="text-lg font-semibold text-slate-900">{column.label}</h2>
                  <p className="max-w-xs text-sm leading-6 text-slate-600">
                    {columnDescription(column.key)}
                  </p>
                </div>
                <span
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-blue-50 px-3 text-sm font-semibold text-blue-700"
                  aria-label={`${columnTasks.length} tasks`}
                >
                  {columnTasks.length}
                </span>
              </div>

              <div className="mb-5 h-px w-full bg-slate-200" />

              <div className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto pr-1">
                {columnTasks.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                    {emptyColumnMessage(column.key)}
                  </div>
                ) : null}

                {sessionGroups.map((group) => (
                  <div key={`${column.key}-${group.session}`} className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <span className={sessionTagClass(group.session)}>
                        {sessionLabel(group.session)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {group.tasks.length} task{group.tasks.length === 1 ? '' : 's'}
                      </span>
                    </div>

                    {group.tasks.map((task) => (
                      <article
                        key={task.id}
                        className="grid cursor-grab gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        draggable
                        onDragStart={() => setDragTaskId(task.id)}
                        onDragEnd={() => setDragTaskId(null)}
                        onClick={() => setActiveTaskId(task.id)}
                      >
                        <div className="grid gap-1">
                          <h3 className="text-base leading-snug font-semibold text-slate-900">
                            {task.title}
                          </h3>
                          <p className="text-sm leading-6 text-slate-700">
                            {task.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className={sessionTagClass(task.session)}>
                            {sessionLabel(task.session)}
                          </span>
                          <span className={priorityTagClass(task.priority)}>
                            Priority: {toTitleCase(task.priority)}
                          </span>
                          <span className={difficultyTagClass(task.difficulty)}>
                            Difficulty: {toTitleCase(task.difficulty)}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {activeTask && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/60 p-4"
          role="presentation"
          onClick={() => setActiveTaskId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            className="w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/30 max-h-[calc(100dvh-2rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <section className="border-b border-slate-200 bg-slate-50 px-5 py-5">
              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    Issue Details
                  </p>
                  <h2
                    id="task-modal-title"
                    className="mt-1 text-2xl leading-tight font-semibold text-slate-900"
                  >
                    {activeTask.title}
                  </h2>
                </div>
                <button
                  type="button"
                  className="h-8 w-8 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-900/10 hover:bg-slate-100"
                  onClick={() => setActiveTaskId(null)}
                  aria-label="Close task details"
                >
                  X
                </button>
              </header>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className={sessionTagClass(activeTask.session)}>
                  {sessionLabel(activeTask.session)}
                </span>
                <span className={priorityTagClass(activeTask.priority)}>
                  Priority: {toTitleCase(activeTask.priority)}
                </span>
                <span className={difficultyTagClass(activeTask.difficulty)}>
                  Difficulty: {toTitleCase(activeTask.difficulty)}
                </span>

                <label className="ml-auto flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Status
                  <select
                    className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-900 normal-case shadow-sm shadow-slate-900/10"
                    value={boardProgress[activeTask.id].status}
                    onChange={(event) =>
                      updateTaskStatus(activeTask.id, event.target.value as TaskStatus)
                    }
                  >
                    {KANBAN_COLUMNS.map((column) => (
                      <option key={column.key} value={column.key}>
                        {column.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <div className="grid gap-4 p-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/10">
                <h3 className="mb-2 text-base font-semibold text-slate-900">Description</h3>
                <p className="leading-relaxed text-slate-700">{activeTask.description}</p>
              </section>

              {relatedGuides.length > 0 ? (
                <details className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/10">
                  <summary className="block w-full cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="flex w-full items-center justify-between gap-3">
                      <span className="text-base font-semibold text-slate-900">
                        Related Guides
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {relatedGuides.length}
                        </span>
                        <span className="text-lg leading-none text-slate-500 transition-transform group-open:rotate-90">
                          &gt;
                        </span>
                      </span>
                    </span>
                  </summary>
                  <div className="mt-3 grid gap-2">
                    {relatedGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-3 hover:border-blue-200 hover:bg-slate-50"
                        to={`/guides/${guide.slug}`}
                        onClick={() => setActiveTaskId(null)}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {guide.category}
                          </span>
                        </div>
                        <h4 className="mt-1 text-sm font-semibold text-slate-900">
                          {guide.title}
                        </h4>
                        <p className="mt-1 text-sm leading-5 text-slate-600 line-clamp-2">
                          {guide.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </details>
              ) : null}

              <details className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/10">
                <summary className="block w-full cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex w-full items-center justify-between gap-3">
                    <span className="text-base font-semibold text-slate-900">
                      Acceptance Criteria
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {boardProgress[activeTask.id].checks.filter(Boolean).length}/
                        {activeTask.acceptanceCriteria.length}
                      </span>
                      <span className="text-lg leading-none text-slate-500 transition-transform group-open:rotate-90">
                        &gt;
                      </span>
                    </span>
                  </span>
                </summary>
                <p className="mt-3 mb-4 text-sm leading-6 text-slate-600">
                  Every point below needs to be complete before this task can move into
                  Done.
                </p>
                <ul className="grid list-none gap-3 p-0">
                  {activeTask.acceptanceCriteria.map((criterion, index) => {
                    const isChecked = boardProgress[activeTask.id].checks[index]

                    return (
                      <li key={`${criterion}-${index}`}>
                        <label
                          className={
                            isChecked
                              ? 'flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-slate-500 shadow-sm shadow-emerald-900/10'
                              : 'flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700 shadow-sm shadow-slate-900/10 hover:border-blue-300'
                          }
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 shrink-0 accent-emerald-600"
                            checked={isChecked}
                            onChange={() => toggleAcceptance(activeTask.id, index)}
                          />
                          <span className={isChecked ? 'line-through' : ''}>{criterion}</span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </details>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
