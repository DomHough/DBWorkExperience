# Editing page content

Editing page content is a good Session 1 task because it is visible straight away and helps the project feel more personal.

## Where to change this in the repo

- File: `src/App.tsx`
- Location: inside `HomePage`, around lines `35` to `45`

## 1. Find the right text

Current code:

```tsx
<p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
  Pokemon API Starter
</p>
<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
  Build a simple Pokemon feature in small steps
</h1>
<p className="max-w-2xl text-base leading-7 text-slate-700">
  Start with a page and a route, then fetch real Pokemon from PokeAPI,
  add a detail page, and improve the experience with search, filtering,
  and pagination.
</p>
```

## 2. Replace the starter copy

Updated code example:

```tsx
<p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
  My Pokemon Project
</p>
<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
  Explore Pokemon I choose from the API
</h1>
<p className="max-w-2xl text-base leading-7 text-slate-700">
  I am building a Pokemon page that shows a list, lets users click into details,
  and helps me practise React and API data.
</p>
```

## 3. Keep the copy matched to the page

Good homepage copy should explain what the page is for right now, not what it might do later.

## Common mistakes

- Editing the wrong file.
- Updating only one line and leaving the rest of the copy mismatched.
- Adding too much text and making the page harder to scan.
