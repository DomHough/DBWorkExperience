# DB Work Experience Session 1 Cheatsheet

## Setup Commands

Install the project:

```sh
npm install
```

Start the app:

```sh
npm run dev
```

Sign in to Codex:

```sh
codex login --device-auth
```

Open the app in your browser using the local URL shown in the terminal. It will usually be:

```text
http://localhost:5173
```

## Session 1 Tasks

Session 1 should stay small and visible. These answers show the current starter code students will find, and an example of what the updated code can look like after each task.

## Task 1: Change the background colour

File: `src/App.tsx`
Where to look: around lines `70` to `85`

Current code:

```tsx
<div className="flex min-h-screen flex-col bg-amber-50 text-slate-900 md:flex-row">
```

Updated code example:

```tsx
<div className="flex min-h-screen flex-col bg-sky-50 text-slate-900 md:flex-row">
```

This is one of the quickest tasks because it changes the whole app background straight away.

## Task 2: Create the list page and route

Files:

- `src/pages/MyListPage.tsx`
- `src/App.tsx`

Where to look:

- `src/pages/MyListPage.tsx` around the top of the file
- `src/App.tsx` around lines `87` to `95`

Current starter-style page code:

```tsx
export function MyListPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">My List Page</h1>
      <p className="text-slate-700">This page will show a simple list.</p>
    </section>
  )
}
```

Updated code example:

```tsx
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function MyListPage() {
  useDocumentTitle('My List Page')

  return (
    <section className="space-y-6 pb-8">
      <div className="overflow-hidden rounded-3xl bg-linear-to-r from-amber-100 via-orange-50 to-blue-100 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          My API Track
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          My List Page
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">
          This page is ready for me to fetch data and show a simple list.
        </p>
      </div>
    </section>
  )
}
```

Current route area in `src/App.tsx`:

```tsx
<Routes>
  <Route path="/" element={<HomePage logoSrc={logoSrc} />} />
  <Route path="/tasks" element={<TasksPage />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/guides" element={<GuidesPage />} />
  <Route path="/guides/:slug" element={<GuidesPage />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

Updated route example:

```tsx
<Routes>
  <Route path="/" element={<HomePage logoSrc={logoSrc} />} />
  <Route path="/tasks" element={<TasksPage />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/guides" element={<GuidesPage />} />
  <Route path="/guides/:slug" element={<GuidesPage />} />
  <Route path="/my-list" element={<MyListPage />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

## Task 3: Add a navbar link to the list page

File: `src/components/Navbar.tsx`
Where to look: around lines `76` to `107`

Current code:

```tsx
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
```

Updated code example with the new navbar link:

```tsx
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
    <div className={navChildClass}>
      <NavLink
        to="/my-list"
        className={({ isActive }) =>
          isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
        }
      >
        My List
      </NavLink>
    </div>
  </div>
</section>
```

## Task 4: Update the home page text

File: `src/App.tsx`
Where to look: inside `HomePage`, around lines `19` to `29`

Current code:

```tsx
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
```

Updated code example:

```tsx
<p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
  My Pokemon Project
</p>
<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
  Explore Pokemon I choose from the API
</h1>
<p className="max-w-2xl text-base leading-7 text-slate-700">
  I am building a page that shows a list, lets users click into details,
  and helps me practise React and API data.
</p>
```

## Task 5: Change the browser tab title

Files:

- `index.html`
- `src/App.tsx`

Where to look:

- `index.html` around line `7`
- `src/App.tsx` inside `HomePage`, around line `12`

Current code:

```html
<title>Pokemon Work Experience</title>
```

```tsx
useDocumentTitle('Pokemon Work Experience')
```

Updated code example:

```html
<title>My Pokemon Project</title>
```

```tsx
useDocumentTitle('My Pokemon Project')
```

## Task 6: Add a button on the home page

File: `src/App.tsx`
Where to look: inside `HomePage`, around lines `32` to `45`

Current code:

```tsx
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
```

Updated code example:

```tsx
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
  <Link
    to="/guides"
    className="inline-flex rounded-2xl border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
  >
    Open Student Guides
  </Link>
</div>
```
