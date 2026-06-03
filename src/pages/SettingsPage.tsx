import { useState } from 'react'
import type { ApiKey } from '../data/tasks'
import {
  API_OPTIONS,
  createDefaultTaskBoardState,
  loadTaskBoardState,
  saveTaskBoardState,
} from '../data/tasks'

interface SettingsPageProps {
  onSelectedApiChange?: (selectedApi: ApiKey | null) => void
}

export function SettingsPage({ onSelectedApiChange }: SettingsPageProps) {
  const [selectedApi, setSelectedApi] = useState<ApiKey | null>(
    () => loadTaskBoardState().selectedApi,
  )

  function handleApiChange(api: ApiKey) {
    const nextState = {
      ...loadTaskBoardState(),
      selectedApi: api,
    }

    saveTaskBoardState(nextState)
    setSelectedApi(api)
    onSelectedApiChange?.(api)
  }

  function handleReset() {
    const nextState = createDefaultTaskBoardState()
    saveTaskBoardState(nextState)
    setSelectedApi(nextState.selectedApi)
    onSelectedApiChange?.(nextState.selectedApi)
  }

  return (
    <section className="mx-auto grid w-full max-w-4xl gap-6">
      <header className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Settings
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Project Settings</h1>
        <p className="max-w-2xl text-slate-700">
          Change the active API track for the task board, or reset progress back to
          the default starting state.
        </p>
      </header>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-slate-900">Active API Track</h2>
            <p className="text-sm leading-6 text-slate-600">
              This decides which set of tasks appears when the board opens.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {API_OPTIONS.map((option) => {
              const isSelected = selectedApi === option.key

              return (
                <button
                  key={option.key}
                  type="button"
                  className={
                    isSelected
                      ? 'rounded-2xl border border-blue-300 bg-blue-50 p-4 text-left shadow-sm'
                      : 'rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-blue-300'
                  }
                  onClick={() => handleApiChange(option.key)}
                >
                  <p className="text-base font-semibold text-slate-900">{option.label}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {isSelected ? 'Currently selected for the board.' : 'Switch to this task track.'}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-slate-900">Reset Task Progress</h2>
            <p className="text-sm leading-6 text-slate-600">
              Clears saved progress, closes out any completed work, and returns the
              board to the default starting point.
            </p>
          </div>

          <div>
            <button
              type="button"
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700 shadow-sm hover:bg-red-100"
              onClick={handleReset}
            >
              Reset Tasks
            </button>
          </div>
        </div>
      </section>
    </section>
  )
}
