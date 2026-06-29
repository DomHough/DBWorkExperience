# Fetching API data

Fetching data is one of the main Session 2+ tasks. In this project, a good first version should handle:

- loading
- error
- successful data

## Example with `fetch`

```tsx
import { useEffect, useState } from 'react'

interface PokemonSummary {
  name: string
  url: string
}

export function PokemonPage() {
  const [pokemon, setPokemon] = useState<PokemonSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemon() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const result = await response.json()
        setPokemon(result.results)
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
          return
        }

        setError('Could not load Pokemon right now.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadPokemon()

    return () => controller.abort()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <ul>
      {pokemon.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  )
}
```

## Why use `useEffect`

The request should run after the component renders, not during rendering.

## Why use an abort controller

If the user leaves the page before the request finishes, the cleanup function cancels the request and avoids updating state after the component unmounts.

## Good habits

- Check `response.ok`.
- Handle loading, empty, and error states.
- Start simple before adding search, filters, or sorting.
- Keep the response shape small and understandable.

## For detail pages

Detail pages usually fetch one item based on the route.

```tsx
const { id } = useParams()
```

Then build the request using that id or slug.

## Common mistakes

- Fetching in the component body.
- Assuming the response shape without checking it.
- Forgetting to handle failures.
- Trying to build search, filtering, and favourites before the basic fetch works.
