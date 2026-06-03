# React basics

React builds interfaces out of components. Each component returns JSX, which looks like HTML but runs inside JavaScript or TypeScript.

## Components

A component is just a function.

```tsx
function WelcomeMessage() {
  return <h1 className="text-2xl font-semibold">Hello</h1>
}
```

Use components to break a page into smaller, named pieces.

## Props

Props let a parent component pass data into a child component.

```tsx
interface WelcomeMessageProps {
  name: string
}

function WelcomeMessage({ name }: WelcomeMessageProps) {
  return <h1>Hello {name}</h1>
}
```

## State

State is data that can change while the user uses the page.

```tsx
const [count, setCount] = useState(0)
```

When state changes, React renders the component again.

## Events

You can update state in response to user actions.

```tsx
<button onClick={() => setCount((current) => current + 1)}>
  Increase
</button>
```

## Rendering lists

Use `map` to turn an array into UI.

```tsx
<ul>
  {pokemon.map((item) => (
    <li key={item.name}>{item.name}</li>
  ))}
</ul>
```

Each item needs a stable `key`.

## Conditional rendering

Show different UI depending on the current state.

```tsx
{isLoading ? <p>Loading...</p> : <PokemonList items={pokemon} />}
```

## Effects

Use `useEffect` for work outside rendering, such as fetching data or talking to browser APIs.

```tsx
useEffect(() => {
  document.title = 'Pokemon page'
}, [])
```

## Rule of thumb

If you can calculate something directly from props or state, do that during rendering. Reach for `useEffect` only when you are synchronising with something outside React.
