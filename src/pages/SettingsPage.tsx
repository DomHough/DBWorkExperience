import { useState } from 'react'
import { createDefaultTaskBoardState, saveTaskBoardState } from '../data/tasks'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function SettingsPage() {
  const [feedback, setFeedback] = useState('')

  useDocumentTitle('Project Settings')

  function handleReset() {
    saveTaskBoardState(createDefaultTaskBoardState())
    setFeedback('Task progress has been reset to the default starter state.')
  }

  return (
    <section className="mx-auto grid w-full max-w-4xl gap-6">
      <header className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Settings
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Project Settings</h1>
        <p className="max-w-2xl text-slate-700">
          Use this page to reset the task board back to its default starting state.
        </p>
      </header>

      {feedback ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
          {feedback}
        </p>
      ) : null}

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-slate-900">Reset Task Progress</h2>
            <p className="text-sm leading-6 text-slate-600">
              Clears saved task progress and returns the board to the default
              starter tasks.
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
