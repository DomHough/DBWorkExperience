# Saving browser data

Some tasks need data to stay saved after a refresh. In this repo, the reusable pattern already exists as a hook.

## Where to look in the repo

- File: `src/hooks/useLocalStorageState.ts`
- Around lines: `1` to `24`

## 1. Before: plain state only

```tsx
const [favourites, setFavourites] = useState<string[]>([])
```

This resets when the page refreshes.

## 2. After: local storage backed state

```tsx
const [favourites, setFavourites] = useLocalStorageState<string[]>(
  'pokemon-favourites',
  [],
)
```

## 3. The reusable hook already handles the save and load work

Current code:

```tsx
function readValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function useLocalStorageState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readValue(key, fallback))

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

## Common mistakes

- Storing much more data than necessary.
- Forgetting to `JSON.stringify()` or `JSON.parse()`.
- Rewriting this logic in a page instead of reusing the hook.
