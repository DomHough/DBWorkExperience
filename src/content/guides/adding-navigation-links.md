# Adding navigation links

Once a page exists, the next step is giving users a clear way to reach it.

In this project, the main navigation lives in `src/components/Navbar.tsx`, and routes live in `src/App.tsx`.

## Where to change this in the repo

- Route file: `src/App.tsx`, around lines `87` to `95`
- Navbar file: `src/components/Navbar.tsx`, around lines `76` to `107`

## 1. Create the route first

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

The `to` value in the navbar must match the `path` in the route.

## 2. Add a `NavLink`

Current navbar code in `src/components/Navbar.tsx`:

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

Updated navbar example with the new list-page link:

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

`NavLink` is useful because it handles the active page styling for you.

## 3. Keep the label short

Good labels are quick to scan:

- `Tasks`
- `Guides`
- `Settings`
- `My List`

## 4. Test the active styling

After adding the link:

- open `/my-list`
- make sure the `My List` link gets the blue active state
- confirm the page opens without a full refresh

## Common mistakes

- Adding the navbar item before the route exists.
- Using the wrong path in `to`.
- Using `Link` when the navbar pattern already uses `NavLink`.
- Forgetting to keep the new link inside the same navbar section as the other project links.
