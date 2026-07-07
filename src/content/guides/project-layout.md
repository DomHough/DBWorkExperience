# Understanding the project layout

This starter app is intentionally small. Most tasks only touch a few files.

## A common change flow in this repo

For most features, the flow is:

1. Update a page in `src/pages`.
2. Add or update a route in `src/App.tsx`.
3. Add navigation in `src/components/Navbar.tsx`.
4. Add helper code in `src/lib` or content in `src/data` if needed.

## Before and after example

If a student adds a Pokemon list page, the change usually looks like this.

Before in `src/App.tsx`, around lines `120` to `134`:

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

Before in `src/components/Navbar.tsx`, around lines `79` to `103`:

```tsx
<NavLink to="/tasks">Tasks</NavLink>
<NavLink to="/guides">Guides</NavLink>
<NavLink to="/settings">Settings</NavLink>
```

After:

```tsx
<NavLink to="/tasks">Tasks</NavLink>
<NavLink to="/guides">Guides</NavLink>
<NavLink to="/settings">Settings</NavLink>
<NavLink to="/my-list">My List</NavLink>
```

## Main folders

- `src/App.tsx`: shared layout, navbar, and routes
- `src/pages`: page components such as `PokemonPage.tsx`
- `src/components`: reusable UI such as `Navbar.tsx`
- `src/data`: task and guide content
- `src/lib`: helper functions such as API fetching
- `src/hooks`: reusable browser and React logic

## Common mistakes

- Editing too many places at once without checking the page after each step.
- Putting route code in a page component instead of `src/App.tsx`.
- Adding reusable helper logic to a page file when it belongs in `src/lib` or `src/hooks`.
