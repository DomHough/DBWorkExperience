# Fetching API data

Fetching data is one of the main Session 2 tasks. In this repo, the Pokemon list page already shows the full pattern.

## Where to change this in the repo

- Page file: `src/pages/PokemonPage.tsx`
- Helper file: `src/lib/pokemon.ts`
- Around lines: `70` to `139` in `PokemonPage.tsx`, `123` to `162` in `pokemon.ts`

## 1. Start with simple state

Before:

```tsx
const [pokemon, setPokemon] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [errorMessage, setErrorMessage] = useState('')
```

After in this project:

```tsx
const [pokemonPage, setPokemonPage] = useState<PokemonPageData | null>(null)
const [offset, setOffset] = useState(0)
const [isLoading, setIsLoading] = useState(true)
const [errorMessage, setErrorMessage] = useState('')
```

## 2. Fetch inside `useEffect`

Current project answer:

```tsx
useEffect(() => {
  const controller = new AbortController()

  async function loadPokemonPage() {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const nextPage = await fetchPokemonPage(offset, PAGE_SIZE, controller.signal)
      setPokemonPage(nextPage)
    } catch (error) {
      if (controller.signal.aborted) {
        return
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while loading Pokemon.',
      )
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false)
      }
    }
  }

  void loadPokemonPage()

  return () => controller.abort()
}, [offset])
```

## 3. Keep the fetch helper separate

Current code in `src/lib/pokemon.ts`:

```tsx
export async function fetchPokemonPage(
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PokemonPageData> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
    { signal },
  )

  if (!response.ok) {
    throw new Error(`Could not load Pokemon page: ${response.status}`)
  }

  const data = (await response.json()) as PokemonListResponse
  // ...
}
```

## 4. Render the results after loading

Before:

```tsx
return <p>Loading...</p>
```

After:

```tsx
const visiblePokemon = sortPokemon(pokemonPage?.items ?? [], sortMode)
```

```tsx
{visiblePokemon.map((pokemon) => (
  <Link key={pokemon.id} to={`/pokemon/${pokemon.name.toLowerCase()}`}>
    {pokemon.name}
  </Link>
))}
```

## Common mistakes

- Fetching in the component body instead of in `useEffect`.
- Skipping loading or error handling.
- Keeping all fetch logic inside the page instead of using `src/lib/pokemon.ts`.
