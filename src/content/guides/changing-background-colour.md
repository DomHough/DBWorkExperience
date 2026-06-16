# Changing a background colour

Changing a background colour is one of the fastest ways to make the project feel like your own. In this starter app, do that with Tailwind classes directly in `className`.

## 1. Find the element that owns the background

Look for the page wrapper or section you want to change. In this project, that is often a `<div>`, `<main>`, or `<section>` with classes like `bg-white` or `bg-slate-100`.

```tsx
<div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
```

## 2. Swap the colour class

Replace the existing background class with another Tailwind colour.

```tsx
<div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">
```

You can also change cards or panels in the same way.

## 3. Check text contrast

If the new background is darker or more colourful, the text colour may also need to change.

```tsx
<section className="rounded-3xl bg-slate-900 text-white p-6">
```

## 4. Test more than one screen size

Open the page on desktop and mobile width. A colour change should still leave the content easy to read in both layouts.

## Common mistakes

- Changing the wrong element and not seeing any visible difference.
- Picking a colour that makes the text hard to read.
- Adding custom CSS instead of using Tailwind utility classes.
