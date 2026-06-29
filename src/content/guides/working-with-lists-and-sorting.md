# Working with lists and sorting

Many tasks in this project depend on working with arrays of data.

Examples:

- rendering API results
- sorting by name or year
- building a team or watchlist
- showing favourites first

## Render a list with `map()`

```tsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>
```

Use a stable key if possible.

## Sort without mutating the original array

JavaScript array sorting changes the original array, so copy it first.

```tsx
const sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title))
```

## Add sort state

```tsx
const [sortOrder, setSortOrder] = useState('title-asc')
```

Then choose the sorting logic from that value.

```tsx
const sortedItems = [...visibleItems].sort((a, b) => {
  if (sortOrder === 'title-asc') {
    return a.title.localeCompare(b.title)
  }

  if (sortOrder === 'title-desc') {
    return b.title.localeCompare(a.title)
  }

  return 0
})
```

## Good uses in this project

- alphabetical sorting
- newest to oldest films
- rating order
- showing saved items in the order they were added

## Common mistakes

- Sorting the original state array directly.
- Adding sorting before the list itself works.
- Creating very complex sort logic too early.
