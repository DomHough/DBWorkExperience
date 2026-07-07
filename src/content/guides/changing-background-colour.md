# Changing a background colour

Changing a background colour is one of the fastest ways to make the project feel different without adding much complexity.

## Where to change this in the repo

- File: `src/App.tsx`
- Around lines: `102` to `118`

## 1. Find the current background class

Current code:

```tsx
<div className="flex min-h-screen flex-col bg-amber-50 text-slate-900 md:flex-row">
```

## 2. Swap the Tailwind class

Updated code example:

```tsx
<div className="flex min-h-screen flex-col bg-sky-50 text-slate-900 md:flex-row">
```

You can swap `bg-amber-50` for another Tailwind colour such as:

- `bg-slate-100`
- `bg-emerald-50`
- `bg-rose-50`

## 3. Check text contrast

If you choose a darker background, you may need to update the text colour too.

Before:

```tsx
<section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
```

After example:

```tsx
<section className="rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
```

## 4. Keep the change simple

For Session 1, one clear background change is enough. Do not move styling into CSS files.

## Common mistakes

- Changing the wrong wrapper and not seeing a visible difference.
- Choosing a background that makes text hard to read.
- Adding custom CSS instead of using Tailwind utility classes.
