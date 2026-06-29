# Adding a button

Buttons are a good Session 1 task because they are small, visible, and useful in almost every feature.

## When to use a button

Use a `<button>` when something happens on the current page, for example:

- open a panel
- load more items
- save a favourite
- add something to a team or watchlist

Use a link when the user should move to another page.

## 1. Pick the right component

Open the page or card component where the action belongs.

In this project, that is often a page in `src/pages` or a repeated card inside a list.

## 2. Add a clear button

Start with a simple button and a label that explains the action.

```tsx
<button
  type="button"
  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
>
  View favourites
</button>
```

## 3. Make the text specific

Avoid labels like `Click here` or `Submit` when they do not explain enough.

Better examples:

- `Save to favourites`
- `Add to team`
- `Open details`
- `Create custom film`

## 4. Add hover and focus states

Interactive elements should look interactive.

```tsx
className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
```

## 5. Connect the button to state

Most buttons in this app will trigger a state update.

```tsx
<button
  type="button"
  onClick={() => setShowFavourites((current) => !current)}
  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
>
  Toggle favourites
</button>
```

## Common mistakes

- Using a button when the action should actually be a page link.
- Writing button text that does not explain the action.
- Forgetting hover or focus styles.
- Adding a button with no `onClick` and no real purpose.
