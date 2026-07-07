import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import pokeLogo from './assets/db_pokeball.svg'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { GuidesPage } from './pages/GuidesPage'
import { PokemonDetailPage } from './pages/PokemonDetailPage'
import { PokemonPage } from './pages/PokemonPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

function HomePage({ logoSrc }: { logoSrc: string }) {
  useDocumentTitle('Pokemon Work Experience')

  return (
    <section className="flex flex-1 items-center justify-center px-6 py-8">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Pokemon API Starter
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Build a simple Pokemon feature in small steps
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              Start with a page and a route, then fetch real Pokemon from PokeAPI,
              add a detail page, and improve the experience with search, filtering,
              and pagination.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/pokemon"
              className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              Open Pokemon List
            </Link>
            <Link
              to="/tasks"
              className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white/80"
            >
              View Task Board
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <img
            className="h-auto max-h-[65vh] w-full max-w-[32rem] object-contain"
            src={logoSrc}
            alt="DB Work Experience logo"
          />
        </div>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const logoSrc = pokeLogo
  const isHomePage = location.pathname === '/'
  const isGuidesPage =
    location.pathname === '/guides' || location.pathname.startsWith('/guides/')
  const isTasksPage = location.pathname === '/tasks'

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 text-slate-900 md:flex-row">
      <Navbar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
      />

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
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:slug" element={<GuidesPage />} />
          <Route path="/pokemon" element={<PokemonPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
