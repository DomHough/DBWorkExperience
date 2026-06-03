# Styling with Tailwind

Tailwind lets you style directly in `className`, which keeps the structure and styling close together.

## Start with layout first

Before choosing colours, make the layout work.

- Use `flex`, `grid`, `gap-*`, `p-*`, and `max-w-*` to control spacing and structure.
- Use `items-*` and `justify-*` to align content.
- Use `min-h-screen` or `w-full` when the layout needs to fill available space.

## Build from small decisions

A card often starts with a few core classes.

```tsx
<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-slate-900">Card title</h2>
  <p className="mt-2 text-slate-600">Supporting text goes here.</p>
</section>
```

## Use responsive prefixes

Tailwind makes it easy to adjust the layout at different screen sizes.

```tsx
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} item={item} />
  ))}
</div>
```

- No prefix means all screen sizes.
- `md:*` applies from the medium breakpoint upwards.
- `xl:*` applies from the extra large breakpoint upwards.

## Reuse patterns carefully

If several elements use the same long class list, extract a small variable.

```tsx
const buttonClass =
  'inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700'
```

This keeps repeated styling readable without moving feature styles into separate CSS files.

## Good habits

- Keep colours and spacing consistent.
- Make interactive elements look interactive.
- Check the page on mobile width, not just desktop.
- Prefer simple utility combinations over complicated one-off styling.

## Common mistakes

- Adding too many classes before the layout is clear.
- Mixing several colour styles with no visual system.
- Forgetting hover, focus, or disabled states on buttons and links.
