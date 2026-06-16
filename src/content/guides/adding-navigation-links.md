# Adding navigation links

Once a new page exists, the next step is giving users a way to reach it from the navbar.

## 1. Open the navbar component

In this project the main navigation lives in `src/components/Navbar.tsx`.

## 2. Add another `NavLink`

Copy the pattern already used for the other links.

```tsx
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
  }
>
  About
</NavLink>
```

`NavLink` is useful here because it knows when the current page matches the link, so you can show an active style automatically.

## 3. Match the route exactly

The `to` value must line up with the `path` you added in `src/App.tsx`.

- Route path: `"/about"`
- Navbar link: `to="/about"`

If those two values do not match, the link will not open the page you expect.

## 4. Test the active state

Click the new link and make sure it changes style in the same way as the other navigation items.

## Common mistakes

- Using `Link` when you meant to reuse the existing `NavLink` active styling.
- Typing the wrong URL in `to`.
- Adding the navigation item before the route exists.
