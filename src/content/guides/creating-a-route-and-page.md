# Creating a route and page

When you want a new screen, create a page component and connect it to the router.

## Where to change this in the repo

- New page file: `src/pages/PokemonPage.tsx`
- Router file: `src/App.tsx`, around lines `120` to `134`

## 1. Create the page component

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

Updated page example:

```tsx
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function PokemonPage() {
  useDocumentTitle('Pokemon Explorer')

  return (
    <section className="space-y-6 pb-8">
      <div className="overflow-hidden rounded-3xl bg-linear-to-r from-amber-100 via-orange-50 to-blue-100 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Pokemon API Track
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Pokemon Explorer
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">
          Browse real Pokemon data from PokeAPI and explore the list page.
        </p>
      </div>
    </section>
  )
}
```

## 2. Import it into `src/App.tsx`

Before:

```tsx
import { GuidesPage } from './pages/GuidesPage'
import { TasksPage } from './pages/TasksPage'
```

After:

```tsx
import { GuidesPage } from './pages/GuidesPage'
import { PokemonPage } from './pages/PokemonPage'
import { TasksPage } from './pages/TasksPage'
```

## 3. Add the route

Before:

```tsx
<Route path="/guides" element={<GuidesPage />} />
<Route path="/guides/:slug" element={<GuidesPage />} />
<Route path="*" element={<Navigate to="/" replace />} />
```

After:

```tsx
<Route path="/guides" element={<GuidesPage />} />
<Route path="/guides/:slug" element={<GuidesPage />} />
<Route path="/pokemon" element={<PokemonPage />} />
<Route path="*" element={<Navigate to="/" replace />} />
```

## 4. Add navigation if needed

Once the route exists, add a navbar link in `src/components/Navbar.tsx`.

## 5. Dynamic routes later

When students move on to detail pages, the same file already shows the pattern:

```tsx
<Route path="/pokemon/:name" element={<PokemonDetailPage />} />
```

## Common mistakes

- Creating the page but forgetting to export it.
- Importing the page with the wrong path.
- Adding the page file but not adding the route.
