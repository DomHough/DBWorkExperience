# Adding a button

Buttons and link-styled buttons are a good Session 1 task because they are small, visible, and useful.

## Where to change this in the repo

- File: `src/App.tsx`
- Location: inside `HomePage`, around lines `48` to `61`

## 1. Use a link for page navigation

In this project, the home page actions already use `Link` from `react-router-dom`.

Current code:

```tsx
<div className="flex flex-wrap gap-3">
  <Link
    to="/pokemon"
    className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
  >
    Open Pokemon List
  </Link>
  <Link
    to="/tasks"
    className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white/80"
  >
    View Task Board
  </Link>
</div>
```

## 2. Add another clear action

Updated code example:

```tsx
<div className="flex flex-wrap gap-3">
  <Link
    to="/pokemon"
    className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
  >
    Open Pokemon List
  </Link>
  <Link
    to="/tasks"
    className="inline-flex rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white/80"
  >
    View Task Board
  </Link>
  <Link
    to="/guides"
    className="inline-flex rounded-2xl border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
  >
    Open Student Guides
  </Link>
</div>
```

## 3. Make the label specific

Better labels explain the destination:

- `Open Pokemon List`
- `View Task Board`
- `Open Student Guides`

## Common mistakes

- Using a plain `<button>` when the action should open another route.
- Writing vague text such as `Click here`.
- Forgetting hover or focus styles.
