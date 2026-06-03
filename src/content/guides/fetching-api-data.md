# Fetching API data

A common React pattern is to store loading, error, and data states separately so the UI can describe what is happening.

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

## Why use an abort controller?

If the user leaves the page before the request finishes, the cleanup function cancels the request and avoids updating state after unmount.

## Good habits

- Check `response.ok` before trusting the response.
- Handle empty, loading, and error states.
- Keep the first version simple before adding search or pagination.
- Fetch inside `useEffect` when the data is needed after the component renders.

## Common mistakes

- Fetching directly in the component body, which causes repeated requests.
- Assuming the API response shape without checking it.
- Forgetting to handle failed requests.
