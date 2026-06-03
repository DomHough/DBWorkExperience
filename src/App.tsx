import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import defaultLogo from './assets/db.svg'
import pokeLogo from './assets/db_pokeball.svg'
import starWarsLogo from './assets/db_starwars.svg'
import type { ApiKey } from './data/tasks'
import { loadTaskBoardState, TASK_BOARD_STORAGE_KEY } from './data/tasks'
import { GuidesPage } from './pages/GuidesPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

function readSelectedApiFromStorage(): ApiKey | null {
  return loadTaskBoardState().selectedApi
}

function getLogoSrc(selectedApi: ApiKey | null) {
  if (selectedApi === 'pokeapi') {
    return pokeLogo
  }

  if (selectedApi === 'swapi') {
    return starWarsLogo
  }

  return defaultLogo
}

function HomePage({ logoSrc }: { logoSrc: string }) {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-8">
      <div className="relative flex w-full max-w-5xl items-center justify-center">
        <img
          className="h-auto max-h-[65vh] w-full max-w-[44rem] object-contain"
          src={logoSrc}
          alt="DB Work Experience logo"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="rounded-2xl border border-white/40 bg-white/35 px-5 py-3 text-center shadow-lg shadow-slate-900/15 backdrop-blur-md">
            <span className="text-xl font-semibold uppercase tracking-[0.24em] text-slate-900 sm:text-2xl">
              DB Work Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const [selectedApi, setSelectedApi] = useState<ApiKey | null>(() =>
    readSelectedApiFromStorage(),
  )
  const logoSrc = useMemo(() => getLogoSrc(selectedApi), [selectedApi])
  const isHomePage = location.pathname === '/'
  const isGuidesPage =
    location.pathname === '/guides' || location.pathname.startsWith('/guides/')
  const isTasksPage = location.pathname === '/tasks'

  useEffect(() => {
    const handleStorageUpdate = (event: StorageEvent) => {
      if (event.key && event.key !== TASK_BOARD_STORAGE_KEY) {
        return
      }

      setSelectedApi(readSelectedApiFromStorage())
    }

    window.addEventListener('storage', handleStorageUpdate)
    return () => window.removeEventListener('storage', handleStorageUpdate)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <Navbar selectedApi={selectedApi} />

      <main
        className={
          isHomePage
            ? 'flex min-h-0 w-full flex-1'
            : isGuidesPage
              ? 'w-full flex-1 px-4 py-4 md:px-6 md:py-6'
            : isTasksPage
              ? 'flex min-h-0 w-full flex-1 flex-col px-4 py-4 md:px-6 md:py-6'
              : 'mx-auto w-full max-w-6xl flex-1 px-6 py-6'
        }
      >
        <Routes>
          <Route path="/" element={<HomePage logoSrc={logoSrc} />} />
          <Route
            path="/tasks"
            element={<TasksPage onSelectedApiChange={setSelectedApi} />}
          />
          <Route
            path="/settings"
            element={<SettingsPage onSelectedApiChange={setSelectedApi} />}
          />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:slug" element={<GuidesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
