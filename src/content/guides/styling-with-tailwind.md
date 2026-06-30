# Styling with Tailwind

Tailwind keeps structure and styling close together in `className`, which matches the rules for this project.

## Project rule

Use Tailwind utility classes for application styling.
Do not add feature styling in CSS files.
If you want to browse available utility classes, use https://tailwind.build/classes

## Start with layout first

Before choosing colours, make sure the layout works.

- use `flex`, `grid`, `gap-*`, `p-*`, and `max-w-*`
- use `items-*` and `justify-*` for alignment
- use responsive prefixes like `md:` when the layout changes at larger sizes

## Common utility groups

These are some of the most useful Tailwind classes for this project.

Font size:

- `text-sm` for smaller text
- `text-base` for normal body text
- `text-xl` or `text-2xl` for headings

Margin:

- `mt-4` adds margin at the top
- `mb-4` adds margin at the bottom
- `mx-auto` can centre a block horizontally

Padding:

- `p-4` adds padding on all sides
- `px-4` adds left and right padding
- `py-2` adds top and bottom padding

Width:

- `w-full` makes an element take the full available width
- `max-w-4xl` limits how wide a section can grow

Height:

- `h-10` gives a fixed height
- `min-h-screen` can make a section fill the screen height

Background colour:

- `bg-white`
- `bg-slate-100`
- `bg-blue-600`

Text colour:

- `text-slate-900`
- `text-slate-700`
- `text-white`

Border:

- `border` adds a border
- `border-slate-200` changes the border colour
- `border-2` makes the border thicker

Border radius:

- `rounded-md`
- `rounded-xl`
- `rounded-2xl`

## Example card

```tsx
<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-slate-900">Card title</h2>
  <p className="mt-2 text-slate-600">Supporting text goes here.</p>
</section>
```

## Useful patterns for this project

List and grid layouts:

```tsx
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} item={item} />
  ))}
</div>
```

Search or filter controls:

```tsx
<div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
  <input className="rounded-xl border border-slate-200 px-3 py-2" />
  <select className="rounded-xl border border-slate-200 px-3 py-2" />
</div>
```

Button example using several common utility groups:

```tsx
<button className="rounded-xl border border-blue-700 bg-blue-600 px-4 py-2 text-base text-white hover:bg-blue-700">
  Open list page
</button>
```

## Reuse repeated class lists carefully

If one class list appears several times, store it in a small variable.

```tsx
const buttonClass =
  'inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700'
```

## Good habits

- Keep spacing consistent.
- Make buttons and links look interactive.
- Check mobile width, not just desktop.
- Keep the number of colours under control.

## Common mistakes

- Adding lots of classes before the layout is clear.
- Mixing too many unrelated colours.
- Forgetting hover, focus, or disabled states.
- Moving feature styling into CSS instead of keeping it in Tailwind classes.
