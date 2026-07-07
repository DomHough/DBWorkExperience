# React basics

React builds the app out of components, state, and JSX. In this repo, `src/pages/PokemonPage.tsx` is a good real example.

## Where to look in the repo

- File: `src/pages/PokemonPage.tsx`
- Around lines: `55` to `245`

## Components

A component is a function that returns JSX.

Before:

```tsx
export function PokemonPage() {
  return <p>Pokemon page</p>
}
```

After:

```tsx
export function PokemonPage() {
  useDocumentTitle('Pokemon Explorer')

  return (
    <section className="space-y-6 pb-8">
      <h1 className="text-3xl font-bold text-slate-900">Pokemon Explorer</h1>
    </section>
  )
}
```

## State

Before:

```tsx
const [searchText, setSearchText] = useState('')
```

After with more page state:

```tsx
const [searchText, setSearchText] = useState('')
const [selectedType, setSelectedType] = useState('all')
const [sortMode, setSortMode] = useState<SortMode>('number')
const [viewMode, setViewMode] = useState<ViewMode>('grid')
```

## Events

Current repo example:

```tsx
<input
  type="search"
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
/>
```

## Rendering lists

Current repo example:

```tsx
{visiblePokemon.map((pokemon) => (
  <Link key={pokemon.id} to={`/pokemon/${pokemon.name.toLowerCase()}`}>
    {pokemon.name}
  </Link>
))}
```

## Effects

Current repo example:

```tsx
useEffect(() => {
  const controller = new AbortController()
  void loadPokemonPage()
  return () => controller.abort()
}, [offset])
```

## Rule of thumb

If data can be calculated from existing state, calculate it during rendering instead of storing another copy.
