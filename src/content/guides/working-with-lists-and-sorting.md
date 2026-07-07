# Working with lists and sorting

Many tasks in this project depend on working with arrays of data. The Pokemon page already includes a small sorting helper.

## Where to look in the repo

- File: `src/pages/PokemonPage.tsx`
- Around lines: `41` to `53`, `62`, `127` to `138`, `199` to `208`

## 1. Render a list with `map()`

Before:

```tsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

After in this project:

```tsx
{visiblePokemon.map((pokemon) => (
  <Link key={pokemon.id} to={`/pokemon/${pokemon.name.toLowerCase()}`}>
    {pokemon.name}
  </Link>
))}
```

## 2. Sort without mutating the original array

Current repo code:

```tsx
function sortPokemon(items: PokemonListItem[], sortMode: SortMode) {
  const sortedItems = [...items]

  sortedItems.sort((firstItem, secondItem) => {
    if (sortMode === 'name') {
      return firstItem.name.localeCompare(secondItem.name)
    }

    return firstItem.id - secondItem.id
  })

  return sortedItems
}
```

## 3. Add sort state

Before:

```tsx
const [sortMode, setSortMode] = useState('number')
```

After:

```tsx
const [sortMode, setSortMode] = useState<SortMode>('number')
```

## Common mistakes

- Sorting the original state array directly.
- Building sorting before the list itself works.
- Using an unstable `key` when rendering repeated items.
