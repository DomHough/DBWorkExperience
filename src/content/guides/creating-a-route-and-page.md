# Creating a route and page

When you want a new screen, create a page component and connect it to the router.

This guide is useful for Session 1 starter tasks and later features such as detail pages, favourites pages, teams, or watchlists.

## 1. Create the page component

Add a new file in `src/pages`.

```tsx
export function FavouritesPage() {
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold text-slate-900">Favourites</h1>
      <p className="text-slate-700">Your saved items will appear here.</p>
    </section>
  )
}
```

## 2. Import it into `src/App.tsx`

```tsx
import { FavouritesPage } from './pages/FavouritesPage'
```

## 3. Add the route

```tsx
<Routes>
  <Route path="/" element={<HomePage logoSrc={logoSrc} />} />
  <Route path="/favourites" element={<FavouritesPage />} />
</Routes>
```

## 4. Add navigation if needed

If users need to reach the page directly, add a navbar link or a button that links to it.

## 5. Dynamic routes for detail pages

Detail pages often need a route parameter.

```tsx
<Route path="/pokemon/:name" element={<PokemonDetailPage />} />
```

Then read it with `useParams()`.

```tsx
const { name } = useParams()
```

## Good next steps

After the route works, you can:

- fetch data for the page
- show one selected item
- add search or sorting
- show a saved collection

## Common mistakes

- Forgetting to export the page component.
- Importing the file with the wrong path.
- Adding the component but not the route.
- Using a link that points to the wrong URL.
