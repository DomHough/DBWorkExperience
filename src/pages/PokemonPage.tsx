import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  fetchPokemonPage,
  fetchPokemonTypes,
  type PokemonListItem,
  type PokemonPageData,
} from '../lib/pokemon'

const PAGE_SIZE = 12

type ViewMode = 'grid' | 'list'
type SortMode = 'number' | 'name'

function typeBadgeClass(type: string) {
  const classes: Record<string, string> = {
    Bug: 'bg-lime-100 text-lime-800',
    Dark: 'bg-slate-200 text-slate-800',
    Dragon: 'bg-indigo-100 text-indigo-800',
    Electric: 'bg-yellow-100 text-yellow-800',
    Fairy: 'bg-pink-100 text-pink-800',
    Fighting: 'bg-red-100 text-red-800',
    Fire: 'bg-orange-100 text-orange-800',
    Flying: 'bg-sky-100 text-sky-800',
    Ghost: 'bg-violet-100 text-violet-800',
    Grass: 'bg-emerald-100 text-emerald-800',
    Ground: 'bg-amber-100 text-amber-800',
    Ice: 'bg-cyan-100 text-cyan-800',
    Normal: 'bg-stone-100 text-stone-800',
    Poison: 'bg-fuchsia-100 text-fuchsia-800',
    Psychic: 'bg-rose-100 text-rose-800',
    Rock: 'bg-yellow-200 text-yellow-900',
    Steel: 'bg-slate-100 text-slate-700',
    Water: 'bg-blue-100 text-blue-800',
  }

  return classes[type] ?? 'bg-slate-100 text-slate-700'
}

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

export function PokemonPage() {
  useDocumentTitle('Pokemon Explorer')

  const [pokemonPage, setPokemonPage] = useState<PokemonPageData | null>(null)
  const [offset, setOffset] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortMode, setSortMode] = useState<SortMode>('number')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [typeOptions, setTypeOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTypes, setIsLoadingTypes] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const deferredSearchText = useDeferredValue(searchText)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemonPage() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const nextPage = await fetchPokemonPage(offset, PAGE_SIZE, controller.signal)
        setPokemonPage(nextPage)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading Pokemon.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPokemonPage()

    return () => controller.abort()
  }, [offset])

  useEffect(() => {
    const controller = new AbortController()

    async function loadTypes() {
      setIsLoadingTypes(true)

      try {
        const nextTypes = await fetchPokemonTypes(controller.signal)
        setTypeOptions(nextTypes)
      } catch {
        if (!controller.signal.aborted) {
          setTypeOptions([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingTypes(false)
        }
      }
    }

    void loadTypes()

    return () => controller.abort()
  }, [])

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

  const currentPage = pokemonPage
    ? Math.floor(pokemonPage.offset / pokemonPage.limit) + 1
    : 1
  const totalPages = pokemonPage
    ? Math.max(1, Math.ceil(pokemonPage.count / pokemonPage.limit))
    : 1

  function resetControls() {
    setSearchText('')
    setSelectedType('all')
    setSortMode('number')
    setViewMode('grid')
  }

  return (
    <section className="space-y-6 pb-8">
      <div className="overflow-hidden rounded-3xl bg-linear-to-r from-amber-100 via-orange-50 to-blue-100 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Pokemon API Track
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Pokemon Explorer
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">
          Browse real Pokemon data from PokeAPI, open a detail page for each item,
          and use simple search, filtering, sorting, and view controls to explore
          the current page of results.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="flex-1 space-y-2">
            <span className="text-sm font-medium text-slate-700">Search this page</span>
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by Pokemon name"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Filter by type</span>
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 lg:min-w-44"
            >
              <option value="all">All types</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Sort</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 lg:min-w-40"
            >
              <option value="number">Pokedex number</option>
              <option value="name">Name</option>
            </select>
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-700">View</span>
            <div className="flex rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={
                  viewMode === 'grid'
                    ? 'rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm'
                    : 'rounded-xl px-4 py-2 text-sm text-slate-600'
                }
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={
                  viewMode === 'list'
                    ? 'rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm'
                    : 'rounded-xl px-4 py-2 text-sm text-slate-600'
                }
              >
                List
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={resetControls}
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Reset controls
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {visiblePokemon.length} of {pokemonPage?.items.length ?? 0} Pokemon
            on page {currentPage} of {totalPages}.
          </p>
          <p>{isLoadingTypes ? 'Loading type filters...' : `${typeOptions.length} type filters ready.`}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-700">Actual API pagination</p>
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages} from PokeAPI
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOffset(pokemonPage?.previousOffset ?? 0)}
            disabled={isLoading || pokemonPage?.previousOffset === null}
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setOffset(pokemonPage?.nextOffset ?? 0)}
            disabled={isLoading || pokemonPage?.nextOffset === null}
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-600">
          Loading Pokemon...
        </div>
      ) : errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-red-700">
          {errorMessage}
        </div>
      ) : visiblePokemon.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900">No Pokemon match those filters.</h2>
          <p className="mt-2 text-sm text-slate-600">
            Try a different search term or clear the filters to see the full page again.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              : 'space-y-4'
          }
        >
          {visiblePokemon.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.name.toLowerCase()}`}
              className={
                viewMode === 'grid'
                  ? 'group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md'
                  : 'group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:shadow-md sm:flex-row sm:items-center'
              }
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
                  {pokemon.image ? (
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="h-20 w-20 object-contain"
                    />
                  ) : (
                    <span className="text-sm text-slate-400">No image</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900 group-hover:text-amber-700">
                    {pokemon.name}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClass(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
