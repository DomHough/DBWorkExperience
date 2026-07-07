import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import pokeLogo from '../assets/db_pokeball.svg'

interface NavbarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function Navbar({ isCollapsed, onToggleCollapse }: NavbarProps) {
  const navBaseClass =
    'rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100'
  const navChildClass = 'ml-3 border-l border-slate-200 pl-3'
  const sectionTitleClass =
    'text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'

  const logoSrc = pokeLogo

  useEffect(() => {
    let iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]')

    if (!iconLink) {
      iconLink = document.createElement('link')
      iconLink.rel = 'icon'
      document.head.appendChild(iconLink)
    }

    iconLink.type = 'image/svg+xml'
    iconLink.href = logoSrc
  }, [logoSrc])

  return (
    <aside
      className={
        isCollapsed
          ? 'w-full border-b border-white/70 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md md:sticky md:top-0 md:h-screen md:w-20 md:shrink-0 md:border-r md:border-b-0'
          : 'w-full border-b border-white/70 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md md:sticky md:top-0 md:h-screen md:w-72 md:shrink-0 md:border-r md:border-b-0'
      }
    >
      <div className="flex h-full flex-col px-5 py-6 md:px-6">
        <div className={isCollapsed ? 'flex items-center justify-center' : 'flex items-start'}>
          <Link
            className="inline-flex items-center gap-3 text-base font-bold text-slate-900"
            to="/"
          >
            <img className="h-8 w-8 shrink-0" src={logoSrc} alt="DB Work Experience logo" />
            {!isCollapsed ? (
              <div className="grid gap-0.5">
                <span>DB Work Experience</span>
                <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Starter Project
                </span>
              </div>
            ) : null}
          </Link>

        </div>

        {isCollapsed ? null : (
          <nav className="mt-10 grid gap-8" aria-label="Main navigation">
            <section className="grid gap-4">
              <h2 className={sectionTitleClass}>Project</h2>
              <div className={navChildClass}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
                  }
                  end
                >
                  Home
                </NavLink>
              </div>
            </section>

            <section className="grid gap-4">
              <h2 className={sectionTitleClass}>Project Management</h2>
              <div className="grid gap-3">
                <div className={navChildClass}>
                  <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                      isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
                    }
                  >
                    Tasks
                  </NavLink>
                </div>
                <div className={navChildClass}>
                  <NavLink
                    to="/guides"
                    className={({ isActive }) =>
                      isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
                    }
                  >
                    Guides
                  </NavLink>
                </div>
                <div className={navChildClass}>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
                    }
                  >
                    Settings
                  </NavLink>
                </div>
              </div>
            </section>
          </nav>
        )}

        <div className="mt-auto flex justify-center pt-8">
          <button
            type="button"
            className={
              isCollapsed
                ? 'hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 md:inline-flex'
                : 'hidden w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 md:inline-flex'
            }
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '>' : 'Collapse sidebar'}
          </button>
        </div>
      </div>
    </aside>
  )
}
