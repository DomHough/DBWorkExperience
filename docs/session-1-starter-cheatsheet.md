# DB Work Experience Session 1 Cheatsheet

## Setup Commands

Enable pnpm if needed:

```sh
corepack enable
```

Install the project:

```sh
pnpm install
```

Sign in to Codex:

```sh
codex login --device-auth
```

Start the app:

```sh
pnpm dev
```

Open the app in your browser using the local URL shown in the terminal. It will usually be:

```text
http://localhost:5173
```

## Session 1 Tasks

Session 1 is for small, beginner-friendly changes. Focus on getting something visible working without building the full API feature yet.

## Task 1: Change the background colour

Use Tailwind classes in JSX.

Look in `src/App.tsx` for `className` values such as:

```tsx
<div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
```

You can change `bg-slate-100` to another Tailwind colour, for example:

```tsx
<div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">
```

## Task 2: Create the list page and route

Create a new page file in `src/pages/`.

Examples:

- `PokemonPage.tsx`
- `FilmsPage.tsx`

Starter example:

```tsx
export function PokemonPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Pokemon</h1>
      <p className="text-slate-700">This page will show a list of Pokemon.</p>
    </section>
  )
}
```

Then import it into `src/App.tsx` and add a route.

```tsx
import { PokemonPage } from './pages/PokemonPage'
```

```tsx
<Route path="/pokemon" element={<PokemonPage />} />
```

You can use the same pattern for a films page:

- page: `FilmsPage.tsx`
- route: `/films`

The page only needs a heading and a short paragraph for Session 1.

## Task 3: Add a navbar link to the list page

Open `src/components/Navbar.tsx`.

Add another `NavLink` like the others:

```tsx
<NavLink
  to="/pokemon"
  className={({ isActive }) =>
    isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
  }
>
  Pokemon
</NavLink>
```

For a films page, change the path and text to match your route.

## Task 4: Update the home page text

The home page is inside `src/App.tsx` in the `HomePage` function.

You can change text such as:

```tsx
<span className="text-xl font-semibold uppercase tracking-[0.24em] text-slate-900">
  DB Work Experience
</span>
```

Example changes:

- `My Pokemon Project`
- `My Film Finder`

## Task 5: Change the browser tab title

Open `index.html`.

Look for the `<title>` tag:

```html
<title>DB Work Experience Starter</title>
```

Change it to something that matches your project, for example:

```html
<title>My Pokemon Project</title>
```

## Task 6: Add a button on the home page

Still in `src/App.tsx`, add a link or button on the home page that sends the user to your list page.

A simple option is a `Link` from `react-router-dom`.

First, make sure `Link` is imported:

```tsx
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
```

Then add something like this inside `HomePage`:

```tsx
<Link
  to="/pokemon"
  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  Open Pokemon List
</Link>
```

For a films page, update the path and button text to match your route.
