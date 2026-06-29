# Changing a background colour

Changing a background colour is one of the fastest ways to make the project feel different without adding much complexity.

## Project rule

Use Tailwind utility classes in `className`.
Do not move feature styling into custom CSS files.

## 1. Find the element with the current background

Look for a wrapper such as:

- `<main>`
- `<section>`
- `<div>`

In this project you will often see classes like `bg-white` or `bg-slate-100`.

```tsx
<div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
```

## 2. Swap the Tailwind class

Replace the old background colour with a new one.

```tsx
<div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">
```

You can do the same on cards and panels.

## 3. Check the text colour

If the background becomes darker or more colourful, you may need to change the text colour too.

```tsx
<section className="rounded-3xl bg-slate-900 p-6 text-white">
```

## 4. Check mobile and desktop

A colour that looks fine on a large screen may feel too strong or reduce readability on mobile.

## 5. Keep the visual system consistent

Try not to make every section a different colour. One or two clear colour decisions usually look better than many unrelated ones.

## Common mistakes

- Changing the wrong element and not seeing any visible difference.
- Picking a colour that makes text hard to read.
- Adding custom CSS instead of Tailwind classes.
- Using too many unrelated colours.
