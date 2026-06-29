# Adding navigation links

Once a page exists, the next step is giving users a clear way to reach it.

## Where navigation lives in this project

The main navigation lives in `src/components/Navbar.tsx`.

Most new screen links should be added there once the route already exists.

## 1. Create the route first

Before adding a navbar link, make sure the page already exists in `src/App.tsx`.

Example route:

```tsx
<Route path="/favourites" element={<FavouritesPage />} />
```

## 2. Add a `NavLink`

Copy the existing pattern from the navbar.

```tsx
<NavLink
  to="/favourites"
  className={({ isActive }) =>
    isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
  }
>
  Favourites
</NavLink>
```

`NavLink` is useful because it can style the active page automatically.

## 3. Match the path exactly

The `to` value in the navbar must match the `path` in `src/App.tsx`.

- route: `"/favourites"`
- navbar: `to="/favourites"`

If they do not match, the link will not open the page you expect.

## 4. Keep the label short

Navigation labels should be short enough to scan quickly.

Good examples:

- `Tasks`
- `Guides`
- `Favourites`
- `Team`
- `Watchlist`

## 5. Test active styling

Open the new page and confirm the active state still looks correct.

## Common mistakes

- Adding the navbar item before the route exists.
- Using the wrong URL in `to`.
- Using a long label that makes the navbar harder to scan.
- Using `Link` when the existing navbar pattern expects `NavLink`.
