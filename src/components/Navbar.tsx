import { useEffect, useMemo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import type { ApiKey } from '../data/tasks'
import defaultLogo from '../assets/db.svg'
import pokeLogo from '../assets/db_pokeball.svg'
import starWarsLogo from '../assets/db_starwars.svg'

interface NavbarProps {
  selectedApi: ApiKey | null
}

export function Navbar({ selectedApi }: NavbarProps) {
  const navBaseClass =
    'rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'

  const logoSrc = useMemo(() => {
    if (selectedApi === 'pokeapi') {
      return pokeLogo
    }

    if (selectedApi === 'swapi') {
      return starWarsLogo
    }

    return defaultLogo
  }, [selectedApi])

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
    <header className="sticky top-0 z-10 bg-white px-6 py-4 shadow-sm shadow-slate-900/10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link
          className="inline-flex items-center gap-2 text-base font-bold text-slate-900"
          to="/"
        >
          <img className="h-8 w-8 shrink-0" src={logoSrc} alt="DB Work Experience logo" />
          <span>DB Work Experience</span>
        </Link>

        <nav className="flex flex-wrap gap-2" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/guides"
            className={({ isActive }) =>
              isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
            }
          >
            Guides
          </NavLink>
          <NavLink
            to="/imdb"
            className={({ isActive }) =>
              isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
            }
          >
            IMDb
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
            }
          >
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
