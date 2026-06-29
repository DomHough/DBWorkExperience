# DB Work Experience Session 1 Cheatsheet

## Codespaces: Codex sign-in workaround

If Codex sign-in fails in browser-based Codespaces or `github.dev`, it may be because the login flow redirects to `http://localhost:1455`, which does not complete properly in that environment.

This repo's devcontainer now forwards port `1455` for the Codex callback and prints the forwarded callback URL when the Codespace starts.

Use this flow:

1. Start or rebuild the Codespace.
2. Open the terminal output and look for:

```text
https://<codespace-name>-1455.<port-forwarding-domain>/auth/callback
```

3. Try signing in to Codex.
4. If the browser lands on `http://localhost:1455/auth/callback?...` and stalls, copy that full URL.
5. Replace `http://localhost:1455` with the forwarded host from step 2, then open the edited URL in the browser.

Example:

```text
http://localhost:1455/auth/callback?code=abc...
```

becomes:

```text
https://<codespace-name>-1455.<port-forwarding-domain>/auth/callback?code=abc...
```

If device code login is available in your Codex setup, that is another good option:

```sh
codex login --device-auth
```

This devcontainer also starts the app automatically with:

```sh
pnpm run dev -- --host 0.0.0.0
```

The Vite log is written to:

```text
/tmp/db-work-experience-vite.log
```

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
- `StarWarsPage.tsx`
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

Track ideas:

- Pokemon API: `/pokemon`
- Star Wars API: `/star-wars`
- Films API: `/films`

## Task 3: Add a navbar link to the list page

Open `src/components/Navbar.tsx`.

You can add another `NavLink` like the others:

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

## Task 4: Update the home page text

The home page is inside `src/App.tsx` in the `HomePage` function.

You can change the text:

```tsx
<span className="text-xl font-semibold uppercase tracking-[0.24em] text-slate-900">
  DB Work Experience
</span>
```

Example changes:

- `Dom's Pokemon Project`
- `Star Wars Explorer`
- `My Film Finder`

## Task 5: Add a button on the home page

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

## Common fixes

If the page does not open:

- check the import in `src/App.tsx`
- check the route path matches the link path
- check the component name matches the file export

If the app shows an error:

- look closely at the terminal
- look for missing imports
- look for missing closing tags like `</section>`
- check capital letters in component names

If styling does not change:

- make sure you edited `className`
- use Tailwind utility classes
- do not put feature styling in a separate CSS file
