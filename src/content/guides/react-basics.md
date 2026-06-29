# React basics

React builds interfaces out of components. In this project, students mainly use React to:

- create pages
- render lists
- respond to clicks and form input
- store data in state
- fetch API data

## Components

A component is a function that returns JSX.

```tsx
function WelcomeMessage() {
  return <h1 className="text-2xl font-semibold">Hello</h1>
}
```

## Props

Props let a parent component pass data into a child component.

```tsx
interface ItemCardProps {
  title: string
}

function ItemCard({ title }: ItemCardProps) {
  return <h2>{title}</h2>
}
```

## State

State is data that can change while the user is using the page.

```tsx
const [searchTerm, setSearchTerm] = useState('')
```

Common state in this project includes:

- search text
- selected filters
- fetched items
- favourites
- custom notes
- custom created items

## Events

Update state in response to user actions.

```tsx
<input
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>
```

```tsx
<button onClick={() => setShowFavourites((current) => !current)}>
  Toggle favourites
</button>
```

## Rendering lists

Use `map()` to turn an array into UI.

```tsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>
```

Each item needs a stable `key`.

## Conditional rendering

Show different UI depending on state.

```tsx
{isLoading ? <p>Loading...</p> : <ItemList items={items} />}
```

## Derived values

Not everything needs its own state.

If you already have `items`, `searchTerm`, and `selectedFilter`, you can often calculate the filtered list during rendering instead of storing another copy.

```tsx
const visibleItems = items.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()),
)
```

## Effects

Use `useEffect` for work outside rendering, such as fetching data or saving to browser storage.

```tsx
useEffect(() => {
  window.localStorage.setItem('saved-search', searchTerm)
}, [searchTerm])
```

## Rule of thumb

If you can calculate something from existing props or state, calculate it directly. Use `useEffect` only when you are synchronising with something outside React.
