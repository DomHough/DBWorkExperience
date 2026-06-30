const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2'

interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}

interface PokemonDetailResponse {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: Array<{
    ability: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  types: Array<{
    type: {
      name: string
    }
  }>
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
  }
}

interface PokemonTypeListResponse {
  results: Array<{
    name: string
  }>
}

export interface PokemonListItem {
  id: number
  name: string
  image: string | null
  types: string[]
}

export interface PokemonDetail {
  id: number
  name: string
  image: string | null
  types: string[]
  abilities: string[]
  stats: Array<{
    name: string
    value: number
  }>
  height: number
  weight: number
  baseExperience: number
}

export interface PokemonPageData {
  count: number
  limit: number
  offset: number
  nextOffset: number | null
  previousOffset: number | null
  items: PokemonListItem[]
}

function getOffsetFromUrl(url: string | null): number | null {
  if (!url) {
    return null
  }

  const parsedUrl = new URL(url)
  const value = parsedUrl.searchParams.get('offset')
  return value ? Number(value) : 0
}

function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getPokemonImage(data: PokemonDetailResponse): string | null {
  return (
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default
  )
}

function mapPokemonDetail(data: PokemonDetailResponse): PokemonDetail {
  return {
    id: data.id,
    name: formatPokemonName(data.name),
    image: getPokemonImage(data),
    types: data.types.map((entry) => formatPokemonName(entry.type.name)),
    abilities: data.abilities.map((entry) => formatPokemonName(entry.ability.name)),
    stats: data.stats.map((entry) => ({
      name: formatPokemonName(entry.stat.name),
      value: entry.base_stat,
    })),
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
  }
}

export async function fetchPokemonPage(
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PokemonPageData> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
    { signal },
  )

  if (!response.ok) {
    throw new Error(`Could not load Pokemon page: ${response.status}`)
  }

  const data = (await response.json()) as PokemonListResponse
  const detailResponses = await Promise.all(
    data.results.map(async (entry) => {
      const detailResponse = await fetch(entry.url, { signal })
      if (!detailResponse.ok) {
        throw new Error(`Could not load ${entry.name}: ${detailResponse.status}`)
      }

      return (await detailResponse.json()) as PokemonDetailResponse
    }),
  )

  return {
    count: data.count,
    limit,
    offset,
    nextOffset: getOffsetFromUrl(data.next),
    previousOffset: getOffsetFromUrl(data.previous),
    items: detailResponses.map((detail) => ({
      id: detail.id,
      name: formatPokemonName(detail.name),
      image: getPokemonImage(detail),
      types: detail.types.map((entry) => formatPokemonName(entry.type.name)),
    })),
  }
}

export async function fetchPokemonDetail(
  nameOrId: string,
  signal?: AbortSignal,
): Promise<PokemonDetail> {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${nameOrId}`, {
    signal,
  })

  if (response.status === 404) {
    throw new Error('not-found')
  }

  if (!response.ok) {
    throw new Error(`Could not load Pokemon: ${response.status}`)
  }

  const data = (await response.json()) as PokemonDetailResponse
  return mapPokemonDetail(data)
}

export async function fetchPokemonTypes(signal?: AbortSignal): Promise<string[]> {
  const response = await fetch(`${POKE_API_BASE_URL}/type`, { signal })

  if (!response.ok) {
    throw new Error(`Could not load Pokemon types: ${response.status}`)
  }

  const data = (await response.json()) as PokemonTypeListResponse
  return data.results
    .map((entry) => formatPokemonName(entry.name))
    .filter((name) => name !== 'Unknown' && name !== 'Shadow')
}
