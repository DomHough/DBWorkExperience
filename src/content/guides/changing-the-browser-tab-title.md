# Changing the browser tab title

The browser tab title is the text shown in the browser tab. In this repo, it can come from both `index.html` and React code.

## Where to change this in the repo

- `index.html`, around line `7`
- `src/App.tsx`, inside `HomePage`, around line `28`
- `src/hooks/useDocumentTitle.ts`, lines `3` to `6`

## 1. Check the starter title in `index.html`

Current code:

```html
<title>Pokemon Work Experience</title>
```

Updated code example:

```html
<title>My Pokemon Project</title>
```

## 2. Check the React title on the home page

Current code in `src/App.tsx`:

```tsx
useDocumentTitle('Pokemon Work Experience')
```

Updated code example:

```tsx
useDocumentTitle('My Pokemon Project')
```

## 3. Understand why both places matter

The helper in `src/hooks/useDocumentTitle.ts` is:

```tsx
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
```

`index.html` gives the first title before React loads.
`useDocumentTitle(...)` updates the title for a specific page after React renders.

## Common mistakes

- Changing a page heading instead of the browser tab title.
- Updating `index.html` but forgetting the React page title.
- Writing a title that is much longer than the browser tab can show clearly.
