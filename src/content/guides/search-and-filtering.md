# Search and filtering

Search and filtering are common Session 2+ tasks. They help users find the right item without changing the original API data.

## Search usually starts with state

```tsx
const [searchTerm, setSearchTerm] = useState('')
```

Connect that state to an input.

```tsx
<input
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  className="rounded-xl border border-slate-200 px-3 py-2"
  placeholder="Search items"
/>
```

## Filter the list during rendering

```tsx
const visibleItems = items.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()),
)
```

This is usually better than storing a second copy of the filtered list in state.

## Add a filter control

```tsx
const [selectedType, setSelectedType] = useState('all')
```

```tsx
<select
  value={selectedType}
  onChange={(event) => setSelectedType(event.target.value)}
  className="rounded-xl border border-slate-200 px-3 py-2"
>
  <option value="all">All</option>
  <option value="favourite">Favourites</option>
</select>
```

## Combine search and filtering

```tsx
const visibleItems = items.filter((item) => {
  const matchesSearch = item.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesFilter = selectedType === 'all' || item.type === selectedType

  return matchesSearch && matchesFilter
})
```

## Handle no results clearly

If nothing matches, tell the user.

```tsx
{visibleItems.length === 0 ? <p>No matching items found.</p> : null}
```

## Common mistakes

- Storing filtered results in state when they can be calculated.
- Forgetting to make search case-insensitive.
- Adding search and filter controls before the basic list works.
- Not handling the empty results case.
