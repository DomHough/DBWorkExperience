# Search and filtering

Search and filtering are common Session 2 tasks. `src/pages/PokemonPage.tsx` already shows the full pattern.

## Where to change this in the repo

- File: `src/pages/PokemonPage.tsx`
- Around lines: `60` to `68`, `127` to `138`, and `170` to `209`

## 1. Search state

Before:

```tsx
const [searchText, setSearchText] = useState('')
```

After with search and filter state:

```tsx
const [searchText, setSearchText] = useState('')
const [selectedType, setSelectedType] = useState('all')
const deferredSearchText = useDeferredValue(searchText)
```

## 2. Input controls

Current repo answer:

```tsx
<input
  type="search"
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
  placeholder="Search by Pokemon name"
  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
/>
```

```tsx
<select
  value={selectedType}
  onChange={(event) => setSelectedType(event.target.value)}
  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 lg:min-w-44"
>
  <option value="all">All types</option>
</select>
```

## 3. Filter the list during rendering

Before:

```tsx
const visiblePokemon = pokemonPage?.items ?? []
```

After:

```tsx
const visiblePokemon = sortPokemon(
  (pokemonPage?.items ?? []).filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(deferredSearchText.trim().toLowerCase())
    const matchesType =
      selectedType === 'all' || pokemon.types.includes(selectedType)

    return matchesSearch && matchesType
  }),
  sortMode,
)
```

## Common mistakes

- Storing filtered results in state instead of calculating them.
- Forgetting to make search case-insensitive.
- Adding controls before the base list works.
