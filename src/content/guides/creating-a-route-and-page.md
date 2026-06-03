# Creating a route and page

When you want to add a new screen to the app, make one React component for the page and then connect it to the router.

## 1. Create a page component

Add a file inside `src/pages`. Keep the component focused on one screen.

```tsx
export function AboutPage() {
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold text-slate-900">About</h1>
      <p className="text-slate-700">This is a new page.</p>
    </section>
  )
}
```

## 2. Import the page into `App.tsx`

The app routes live in `src/App.tsx`, so import your new page there.

```tsx
import { AboutPage } from './pages/AboutPage'
```

## 3. Add a route

Each route connects a URL to a React component.

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

## 4. Add a navigation link

If users need to reach the page from the menu, add a link in the navbar.

```tsx
<NavLink to="/about">About</NavLink>
```

## 5. Check the URL

Run the app and open `/about`. If the route is connected correctly, the new page should render without a full browser refresh.

## Common mistakes

- Forgetting to export the page component.
- Importing the file with the wrong path.
- Adding the component but forgetting to add the route.
- Using a `Link` or `NavLink` that points to the wrong URL.

## Good next step

Once the route works, add real content, fetch data, or break the page into smaller components if it starts getting too large.
