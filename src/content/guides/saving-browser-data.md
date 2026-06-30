# Saving browser data

Some newer tasks in this project need data to stay saved after a refresh.

Examples:

- favourites
- notes
- a team or watchlist
- custom created items

A simple way to do that in a front-end starter project is `localStorage`.

## 1. Save state when it changes

```tsx
useEffect(() => {
  window.localStorage.setItem('favourites', JSON.stringify(favourites))
}, [favourites])
```

## 2. Read saved data when the component starts

```tsx
const [favourites, setFavourites] = useState<string[]>(() => {
  const raw = window.localStorage.getItem('favourites')

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
})
```

## 3. Keep the saved shape simple

Use data that is easy to understand, such as:

- an array of ids
- an array of small objects
- a record keyed by id

## 4. Use clear storage keys

Examples:

- `pokemon-favourites`
- `pokemon-team`
- `pokemon-notes`

## Common mistakes

- Saving data that is much larger than necessary.
- Forgetting `JSON.stringify()` when saving objects or arrays.
- Forgetting `JSON.parse()` when reading objects or arrays.
- Not handling invalid saved data safely.
