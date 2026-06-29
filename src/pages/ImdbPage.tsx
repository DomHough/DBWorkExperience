import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'

const API_BASE_URL = 'https://api.imdbapi.dev'
const POPULAR_MOVIES_PATH =
  '/titles?types=MOVIE&sortBy=SORT_BY_POPULARITY&sortOrder=DESC'
const SEARCH_LIMIT = 12

interface ImdbImage {
  url?: string
}

interface ImdbRating {
  aggregateRating?: number
  voteCount?: number
}

interface ImdbName {
  id: string
  displayName: string
}

interface ImdbTitle {
  id: string
  type?: string
  primaryTitle?: string
  originalTitle?: string
  primaryImage?: ImdbImage
  startYear?: number
  endYear?: number
  runtimeSeconds?: number
  genres?: string[]
  rating?: ImdbRating
  plot?: string
  directors?: ImdbName[]
  writers?: ImdbName[]
  stars?: ImdbName[]
}

interface ListTitlesResponse {
  titles?: ImdbTitle[]
}

interface SearchTitlesResponse {
  titles?: ImdbTitle[]
}

interface ApiErrorResponse {
  message?: string
}

function formatRuntime(runtimeSeconds?: number): string {
  if (!runtimeSeconds) {
    return 'Runtime unavailable'
  }

  const totalMinutes = Math.round(runtimeSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${totalMinutes} min`
  }

  return `${hours}h ${minutes}m`
}

function formatYearRange(title: ImdbTitle): string {
  if (!title.startYear) {
    return 'Year unavailable'
  }

  if (!title.endYear || title.endYear === title.startYear) {
    return `${title.startYear}`
  }

  return `${title.startYear} to ${title.endYear}`
}

function formatRating(rating?: ImdbRating): string {
  if (!rating?.aggregateRating) {
    return 'Rating unavailable'
  }

  const votes = rating.voteCount ? ` from ${rating.voteCount.toLocaleString()} votes` : ''
  return `${rating.aggregateRating.toFixed(1)}/10${votes}`
}

function formatPeople(people?: ImdbName[]): string {
  if (!people?.length) {
    return 'Not listed'
  }

  return people.map((person) => person.displayName).join(', ')
}

function getTitleLabel(title: ImdbTitle): string {
  return title.primaryTitle || title.originalTitle || title.id
}

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })

  if (!response.ok) {
    let message = 'Request failed.'

    try {
      const errorPayload = (await response.json()) as ApiErrorResponse
      if (errorPayload.message) {
        message = errorPayload.message
      }
    } catch {
      message = `${response.status} ${response.statusText}`
    }

    throw new Error(message)
  }

  return (await response.json()) as T
}

export function ImdbPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [titles, setTitles] = useState<ImdbTitle[]>([])
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<ImdbTitle | null>(null)
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [listError, setListError] = useState('')
  const [detailsError, setDetailsError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPopularMovies() {
      setIsLoadingList(true)
      setListError('')

      try {
        const data = await fetchJson<ListTitlesResponse>(
          POPULAR_MOVIES_PATH,
          controller.signal,
        )
        const nextTitles = data.titles ?? []
        setTitles(nextTitles)
        setSelectedTitleId(nextTitles[0]?.id ?? null)
        setSelectedTitle(null)
        setDetailsError('')
        setSubmittedQuery('')
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setTitles([])
        setSelectedTitleId(null)
        setSelectedTitle(null)
        setDetailsError('')
        setListError(
          error instanceof Error
            ? error.message
            : 'Unable to load films from imdbapi.dev.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingList(false)
        }
      }
    }

    void loadPopularMovies()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!selectedTitleId) {
      return
    }

    const controller = new AbortController()

    async function loadTitleDetails() {
      setIsLoadingDetails(true)
      setDetailsError('')

      try {
        const data = await fetchJson<ImdbTitle>(
          `/titles/${selectedTitleId}`,
          controller.signal,
        )
        setSelectedTitle(data)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setSelectedTitle(null)
        setDetailsError(
          error instanceof Error
            ? error.message
            : 'Unable to load film details from imdbapi.dev.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingDetails(false)
        }
      }
    }

    void loadTitleDetails()
    return () => controller.abort()
  }, [selectedTitleId])

  const resultLabel = useMemo(() => {
    if (!submittedQuery) {
      return 'Popular films'
    }

    return `Search results for "${submittedQuery}"`
  }, [submittedQuery])

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedQuery = searchQuery.trim()
    if (!trimmedQuery) {
      return
    }

    setIsLoadingList(true)
    setListError('')

    try {
      const data = await fetchJson<SearchTitlesResponse>(
        `/search/titles?query=${encodeURIComponent(trimmedQuery)}&limit=${SEARCH_LIMIT}`,
      )
      const nextTitles = data.titles ?? []

      setTitles(nextTitles)
      setSelectedTitleId(nextTitles[0]?.id ?? null)
      setSelectedTitle(null)
      setDetailsError('')
      setSubmittedQuery(trimmedQuery)
    } catch (error) {
      setTitles([])
      setSelectedTitleId(null)
      setSelectedTitle(null)
      setDetailsError('')
      setListError(
        error instanceof Error ? error.message : 'Unable to search imdbapi.dev.',
      )
    } finally {
      setIsLoadingList(false)
    }
  }

  async function handleLoadPopularMovies() {
    setSearchQuery('')
    setIsLoadingList(true)
    setListError('')

    try {
      const data = await fetchJson<ListTitlesResponse>(POPULAR_MOVIES_PATH)
      const nextTitles = data.titles ?? []

      setTitles(nextTitles)
      setSelectedTitleId(nextTitles[0]?.id ?? null)
      setSelectedTitle(null)
      setDetailsError('')
      setSubmittedQuery('')
    } catch (error) {
      setTitles([])
      setSelectedTitleId(null)
      setSelectedTitle(null)
      setDetailsError('')
      setListError(
        error instanceof Error
          ? error.message
          : 'Unable to load films from imdbapi.dev.',
      )
    } finally {
      setIsLoadingList(false)
    }
  }

  return (
    <section className="grid gap-6">
      <header className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            API Example
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">IMDb API Explorer</h1>
          <p className="max-w-3xl text-slate-700">
            This page uses imdbapi.dev to list films, search by title, and show
            details for one selected result. It is intentionally small so students can
            inspect the fetch logic and extend it.
          </p>
        </div>

        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="imdb-search">
            Search films
          </label>
          <input
            id="imdb-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search for a film title"
            className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Search
            </button>
            <button
              type="button"
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              onClick={() => void handleLoadPopularMovies()}
            >
              Popular films
            </button>
          </div>
        </form>

        <p className="text-sm leading-6 text-slate-600">
          Note: imdbapi.dev is currently rate limiting this network with `429 Too many
          network requests` responses, so the page includes explicit API error
          messages instead of failing silently.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{resultLabel}</h2>
              <p className="text-sm text-slate-600">
                Choose a title to load its details.
              </p>
            </div>
            {isLoadingList ? (
              <span className="text-sm font-medium text-slate-500">Loading...</span>
            ) : (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {titles.length} results
              </span>
            )}
          </div>

          {listError ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {listError}
            </p>
          ) : null}

          {!listError && !isLoadingList && titles.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              No films matched that search.
            </p>
          ) : null}

          <div className="mt-4 grid gap-3">
            {titles.map((title) => {
              const isSelected = selectedTitleId === title.id

              return (
                <button
                  key={title.id}
                  type="button"
                  className={
                    isSelected
                      ? 'grid gap-2 rounded-2xl border border-blue-300 bg-blue-50 p-4 text-left shadow-sm'
                      : 'grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:bg-slate-50'
                  }
                  onClick={() => setSelectedTitleId(title.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold text-slate-900">
                      {getTitleLabel(title)}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {title.type ?? 'title'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    <span>{formatYearRange(title)}</span>
                    <span>&#8226;</span>
                    <span>{formatRuntime(title.runtimeSeconds)}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Film details</h2>
              <p className="text-sm text-slate-600">
                The right-hand panel calls `GET /titles/:titleId`.
              </p>
            </div>

            {isLoadingDetails ? (
              <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Loading selected film details...
              </p>
            ) : null}

            {detailsError ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {detailsError}
              </p>
            ) : null}

            {!isLoadingDetails && !detailsError && !selectedTitle ? (
              <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Pick a film from the list to display information about it.
              </p>
            ) : null}

            {selectedTitle ? (
              <article className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
                  {selectedTitle.primaryImage?.url ? (
                    <img
                      src={selectedTitle.primaryImage.url}
                      alt={`${getTitleLabel(selectedTitle)} poster`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-80 items-center justify-center px-6 text-center text-sm text-slate-500">
                      Poster unavailable
                    </div>
                  )}
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h3 className="text-3xl font-semibold text-slate-900">
                      {getTitleLabel(selectedTitle)}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                      <span>{selectedTitle.id}</span>
                      <span>&#8226;</span>
                      <span>{formatYearRange(selectedTitle)}</span>
                      <span>&#8226;</span>
                      <span>{formatRuntime(selectedTitle.runtimeSeconds)}</span>
                    </div>
                  </div>

                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Rating
                      </dt>
                      <dd className="mt-2 text-sm text-slate-900">
                        {formatRating(selectedTitle.rating)}
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Genres
                      </dt>
                      <dd className="mt-2 text-sm text-slate-900">
                        {selectedTitle.genres?.join(', ') || 'Not listed'}
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Directors
                      </dt>
                      <dd className="mt-2 text-sm text-slate-900">
                        {formatPeople(selectedTitle.directors)}
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Stars
                      </dt>
                      <dd className="mt-2 text-sm text-slate-900">
                        {formatPeople(selectedTitle.stars)}
                      </dd>
                    </div>
                  </dl>

                  <div className="grid gap-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Plot
                    </h4>
                    <p className="leading-7 text-slate-700">
                      {selectedTitle.plot || 'Plot summary unavailable.'}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Writers
                    </h4>
                    <p className="text-slate-700">
                      {formatPeople(selectedTitle.writers)}
                    </p>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  )
}
