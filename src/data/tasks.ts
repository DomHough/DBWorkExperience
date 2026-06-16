export type ApiKey = 'pokeapi' | 'swapi'
export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type UnlockRule = 'all' | 'any'
export type PriorityTag = 'low' | 'medium' | 'high'
export type DifficultyTag = 'beginner' | 'intermediate' | 'advanced'

export interface TaskDefinition {
  id: string
  api: ApiKey
  title: string
  description: string
  acceptanceCriteria: string[]
  guideSlugs?: string[]
  priority: PriorityTag
  difficulty: DifficultyTag
  dependencies?: string[]
  unlockRule?: UnlockRule
}

export interface TaskProgress {
  status: TaskStatus
  checks: boolean[]
}

export type ApiTaskProgress = Record<string, TaskProgress>
export type BoardProgress = Record<ApiKey, ApiTaskProgress>

export interface PersistedTaskState {
  selectedApi: ApiKey | null
  progress: BoardProgress
}

export const TASK_BOARD_STORAGE_KEY = 'db-work-experience-task-board-v1'

export const API_OPTIONS: Array<{ key: ApiKey; label: string }> = [
  { key: 'pokeapi', label: 'PokeAPI' },
  { key: 'swapi', label: 'Star Wars API' },
]

export const KANBAN_COLUMNS: Array<{ key: TaskStatus; label: string }> = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
]

export const TASKS: TaskDefinition[] = [
  {
    id: 'poke-change-background',
    api: 'pokeapi',
    title: 'Change the background colour',
    description:
      'Update one of the main page backgrounds with Tailwind classes so the app looks visibly different.',
    acceptanceCriteria: [
      'A background colour has been changed using Tailwind utility classes',
      'Text still has enough contrast to stay readable',
      'The change is visible on a main screen such as Home, Tasks, or Guides',
    ],
    guideSlugs: ['changing-background-colour', 'styling-with-tailwind'],
    priority: 'high',
    difficulty: 'beginner',
  },
  {
    id: 'poke-create-page',
    api: 'pokeapi',
    title: 'Create a new page',
    description:
      'Add a simple page component and connect it to the router so the app has one more screen.',
    acceptanceCriteria: [
      'A new page component exists in `src/pages`',
      'A matching route has been added in `src/App.tsx`',
      'The page renders a heading and a short paragraph',
    ],
    guideSlugs: ['creating-a-route-and-page', 'react-basics'],
    priority: 'high',
    difficulty: 'beginner',
  },
  {
    id: 'poke-add-navbar-link',
    api: 'pokeapi',
    title: 'Add a navbar link to the new page',
    description:
      'Extend the navbar so users can open the new page without typing the URL manually.',
    acceptanceCriteria: [
      'A new navigation item has been added to the navbar',
      'Clicking the link opens the new page without a full refresh',
      'The active page styling still works when the new link is selected',
    ],
    guideSlugs: ['adding-navigation-links', 'creating-a-route-and-page'],
    priority: 'medium',
    difficulty: 'beginner',
    dependencies: ['poke-create-page'],
  },
  {
    id: 'poke-update-copy',
    api: 'pokeapi',
    title: 'Update some page text',
    description:
      'Replace some starter copy with your own wording so the site begins to feel like your project.',
    acceptanceCriteria: [
      'At least one heading or paragraph has been changed',
      'The new text explains the page or project more clearly',
      'The content still fits the layout on mobile and desktop',
    ],
    guideSlugs: ['editing-page-content', 'react-basics'],
    priority: 'medium',
    difficulty: 'beginner',
  },
  {
    id: 'poke-add-button',
    api: 'pokeapi',
    title: 'Add a simple button',
    description:
      'Place a button on a page to practise JSX structure and Tailwind button styling.',
    acceptanceCriteria: [
      'A button has been added to one of the pages',
      'The button text makes its purpose clear',
      'The button includes hover or focus styles using Tailwind classes',
    ],
    guideSlugs: ['adding-a-button', 'styling-with-tailwind', 'react-basics'],
    priority: 'low',
    difficulty: 'beginner',
    dependencies: ['poke-create-page'],
  },
  {
    id: 'swapi-change-background',
    api: 'swapi',
    title: 'Change the background colour',
    description:
      'Update one of the main page backgrounds with Tailwind classes so the app looks visibly different.',
    acceptanceCriteria: [
      'A background colour has been changed using Tailwind utility classes',
      'Text still has enough contrast to stay readable',
      'The change is visible on a main screen such as Home, Tasks, or Guides',
    ],
    guideSlugs: ['changing-background-colour', 'styling-with-tailwind'],
    priority: 'high',
    difficulty: 'beginner',
  },
  {
    id: 'swapi-create-page',
    api: 'swapi',
    title: 'Create a new page',
    description:
      'Add a simple page component and connect it to the router so the app has one more screen.',
    acceptanceCriteria: [
      'A new page component exists in `src/pages`',
      'A matching route has been added in `src/App.tsx`',
      'The page renders a heading and a short paragraph',
    ],
    guideSlugs: ['creating-a-route-and-page', 'react-basics'],
    priority: 'high',
    difficulty: 'beginner',
  },
  {
    id: 'swapi-add-navbar-link',
    api: 'swapi',
    title: 'Add a navbar link to the new page',
    description:
      'Extend the navbar so users can open the new page without typing the URL manually.',
    acceptanceCriteria: [
      'A new navigation item has been added to the navbar',
      'Clicking the link opens the new page without a full refresh',
      'The active page styling still works when the new link is selected',
    ],
    guideSlugs: ['adding-navigation-links', 'creating-a-route-and-page'],
    priority: 'medium',
    difficulty: 'beginner',
    dependencies: ['swapi-create-page'],
  },
  {
    id: 'swapi-update-copy',
    api: 'swapi',
    title: 'Update some page text',
    description:
      'Replace some starter copy with your own wording so the site begins to feel like your project.',
    acceptanceCriteria: [
      'At least one heading or paragraph has been changed',
      'The new text explains the page or project more clearly',
      'The content still fits the layout on mobile and desktop',
    ],
    guideSlugs: ['editing-page-content', 'react-basics'],
    priority: 'medium',
    difficulty: 'beginner',
  },
  {
    id: 'swapi-add-button',
    api: 'swapi',
    title: 'Add a simple button',
    description:
      'Place a button on a page to practise JSX structure and Tailwind button styling.',
    acceptanceCriteria: [
      'A button has been added to one of the pages',
      'The button text makes its purpose clear',
      'The button includes hover or focus styles using Tailwind classes',
    ],
    guideSlugs: ['adding-a-button', 'styling-with-tailwind', 'react-basics'],
    priority: 'low',
    difficulty: 'beginner',
    dependencies: ['swapi-create-page'],
  },
]

export const TASKS_BY_API: Record<ApiKey, TaskDefinition[]> = {
  pokeapi: TASKS.filter((task) => task.api === 'pokeapi'),
  swapi: TASKS.filter((task) => task.api === 'swapi'),
}

export function createDefaultTaskBoardState(): PersistedTaskState {
  const progress = {} as PersistedTaskState['progress']

  for (const option of API_OPTIONS) {
    const apiTasks = TASKS_BY_API[option.key]
    const apiProgress: ApiTaskProgress = {}

    for (const task of apiTasks) {
      apiProgress[task.id] = {
        status: 'todo',
        checks: task.acceptanceCriteria.map(() => false),
      }
    }

    progress[option.key] = apiProgress
  }

  return { selectedApi: null, progress }
}

function normaliseTaskProgress(
  api: ApiKey,
  incoming: unknown,
): ApiTaskProgress {
  const defaults: ApiTaskProgress = {}

  const incomingObject =
    incoming && typeof incoming === 'object'
      ? (incoming as Record<string, unknown>)
      : {}

  for (const task of TASKS_BY_API[api]) {
    const saved = incomingObject[task.id]
    const savedObject =
      saved && typeof saved === 'object' ? (saved as Record<string, unknown>) : {}

    const status =
      savedObject.status === 'todo' ||
      savedObject.status === 'in-progress' ||
      savedObject.status === 'done'
        ? savedObject.status
        : 'todo'

    const rawChecks = Array.isArray(savedObject.checks) ? savedObject.checks : []
    const checks = task.acceptanceCriteria.map((_, index) => rawChecks[index] === true)

    defaults[task.id] = {
      status,
      checks,
    }
  }

  return defaults
}

export function loadTaskBoardState(): PersistedTaskState {
  const fallback = createDefaultTaskBoardState()

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(TASK_BOARD_STORAGE_KEY)
    if (!raw) {
      return fallback
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>
    const progress =
      parsed.progress && typeof parsed.progress === 'object'
        ? (parsed.progress as Record<string, unknown>)
        : {}

    const selected =
      parsed.selectedApi === 'pokeapi' || parsed.selectedApi === 'swapi'
        ? parsed.selectedApi
        : null

    return {
      selectedApi: selected,
      progress: {
        pokeapi: normaliseTaskProgress('pokeapi', progress.pokeapi),
        swapi: normaliseTaskProgress('swapi', progress.swapi),
      },
    }
  } catch {
    return fallback
  }
}

export function saveTaskBoardState(state: PersistedTaskState): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(TASK_BOARD_STORAGE_KEY, JSON.stringify(state))
}
