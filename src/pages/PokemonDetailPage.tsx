import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fetchPokemonDetail, type PokemonDetail } from '../lib/pokemon'

function labelValue(value: number, suffix: string) {
  return `${value} ${suffix}`
}

export function PokemonDetailPage() {
  const { name = '' } = useParams()
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useDocumentTitle(pokemon ? `${pokemon.name} | Pokemon Explorer` : 'Pokemon Details')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemon() {
      setIsLoading(true)
      setIsNotFound(false)
      setErrorMessage('')

      try {
        const nextPokemon = await fetchPokemonDetail(name.toLowerCase(), controller.signal)
        setPokemon(nextPokemon)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setPokemon(null)

        if (error instanceof Error && error.message === 'not-found') {
          setIsNotFound(true)
        } else {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Something went wrong while loading this Pokemon.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPokemon()

    return () => controller.abort()
  }, [name])

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-600">
        Loading Pokemon details...
      </section>
    )
  }

  if (isNotFound) {
    return (
      <section className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50 px-6 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">Pokemon not found</h1>
        <p className="text-slate-700">
          We could not find a Pokemon called "{name}".
        </p>
        <Link
          to="/pokemon"
          className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Back to Pokemon list
        </Link>
      </section>
    )
  }

  if (errorMessage || !pokemon) {
    return (
      <section className="space-y-4 rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-red-700">
        <h1 className="text-2xl font-semibold">Could not load this Pokemon</h1>
        <p>{errorMessage || 'An unknown error occurred.'}</p>
        <Link
          to="/pokemon"
          className="inline-flex rounded-2xl border border-red-300 px-4 py-2 text-sm font-medium transition hover:bg-red-100"
        >
          Back to Pokemon list
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-6 pb-8">
      <Link
        to="/pokemon"
        className="inline-flex rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
      >
        Back to Pokemon list
      </Link>

      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <div className="rounded-3xl bg-linear-to-b from-amber-100 via-orange-50 to-white p-6 shadow-sm">
          <div className="rounded-3xl bg-white/80 p-6">
            {pokemon.image ? (
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto h-56 w-full max-w-56 object-contain"
              />
            ) : (
              <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
              #{pokemon.id.toString().padStart(3, '0')}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">{pokemon.name}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Height</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {labelValue(pokemon.height, 'dm')}
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Weight</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {labelValue(pokemon.weight, 'hg')}
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Base experience</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {pokemon.baseExperience}
              </p>
            </article>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Abilities</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {pokemon.abilities.map((ability) => (
                  <li key={ability} className="rounded-2xl bg-slate-50 px-3 py-2">
                    {ability}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Base stats</h2>
              <ul className="mt-4 space-y-3">
                {pokemon.stats.map((stat) => (
                  <li key={stat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span>{stat.name}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-amber-400"
                        style={{ width: `${Math.min(stat.value, 150) / 1.5}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
