# Styling with Tailwind

Tailwind keeps structure and styling close together in `className`, which matches the rules for this project.

## Project rule

Use Tailwind utility classes for application styling.
Do not add feature styling in CSS files.

## Where to look in the repo

- `src/App.tsx` for page layout
- `src/components/Navbar.tsx` for navigation styling
- `src/pages/PokemonPage.tsx` for page cards, controls, and layout

## Before and after example

Before:

```tsx
<section>
  <h1>Pokemon Explorer</h1>
  <p>Browse Pokemon</p>
</section>
```

After:

```tsx
<section className="space-y-6 pb-8">
  <div className="overflow-hidden rounded-3xl bg-linear-to-r from-amber-100 via-orange-50 to-blue-100 p-6 shadow-sm">
    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Pokemon Explorer</h1>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">
      Browse real Pokemon data from PokeAPI.
    </p>
  </div>
</section>
```

## Useful patterns in this repo

Controls:

```tsx
className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
```

Cards:

```tsx
className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
```

Buttons:

```tsx
className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
```

## Common mistakes

- Adding custom CSS instead of Tailwind classes.
- Mixing too many unrelated colours.
- Forgetting hover or focus styles on interactive elements.
