export type ApiKey = 'pokeapi' | 'swapi'
export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type UnlockRule = 'all' | 'any'
export type PriorityTag = 'low' | 'medium' | 'high'
export type DifficultyTag = 'beginner' | 'intermediate' | 'advanced'

export interface TaskDefinition {
  id: string
  api: ApiKey
  title: string
  description: string
  acceptanceCriteria: string[]
  priority: PriorityTag
  difficulty: DifficultyTag
  dependencies?: string[]
  unlockRule?: UnlockRule
}

export interface TaskProgress {
  status: TaskStatus
  checks: boolean[]
}

export type ApiTaskProgress = Record<string, TaskProgress>
export type BoardProgress = Record<ApiKey, ApiTaskProgress>

export interface PersistedTaskState {
  selectedApi: ApiKey | null
  progress: BoardProgress
}

export const TASK_BOARD_STORAGE_KEY = 'db-work-experience-task-board-v1'

export const API_OPTIONS: Array<{ key: ApiKey; label: string }> = [
  { key: 'pokeapi', label: 'PokeAPI' },
  { key: 'swapi', label: 'Star Wars API' },
]

export const KANBAN_COLUMNS: Array<{ key: TaskStatus; label: string }> = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
]

export const TASKS: TaskDefinition[] = [
  {
    id: 'poke-fetch-list',
    api: 'pokeapi',
    title: 'Fetch Pokemon list',
    description:
      'Build a basic service call that loads Pokemon names from the API and handles loading/error states.',
    acceptanceCriteria: [
      'List request function is in a reusable service module',
      'Loading and error states are visible in the UI',
      'At least 20 Pokemon names render in a clean list',
    ],
    priority: 'high',
    difficulty: 'beginner',
  },
  {
    id: 'poke-detail-view',
    api: 'pokeapi',
    title: 'Pokemon detail view',
    description:
      'Add a detail panel for one Pokemon that shows basic stats and type information.',
    acceptanceCriteria: [
      'Selecting a Pokemon loads detail data',
      'Types and at least two base stats are shown',
      'Invalid Pokemon IDs are handled safely',
    ],
    priority: 'high',
    difficulty: 'intermediate',
    dependencies: ['poke-fetch-list'],
  },
  {
    id: 'poke-search-filter',
    api: 'pokeapi',
    title: 'Search and filter',
    description:
      'Allow users to search by name and filter the currently loaded list quickly.',
    acceptanceCriteria: [
      'Search input filters list by partial name',
      'Clear action resets filters',
      'Filtering does not trigger unnecessary API calls',
    ],
    priority: 'medium',
    difficulty: 'intermediate',
    dependencies: ['poke-fetch-list'],
  },
  {
    id: 'poke-team-builder',
    api: 'pokeapi',
    title: 'Simple team builder',
    description:
      'Let users add and remove Pokemon from a six-slot team using data from the list/detail features.',
    acceptanceCriteria: [
      'Users can add up to six Pokemon',
      'Users can remove a Pokemon from any slot',
      'Duplicate handling is defined and implemented',
    ],
    priority: 'medium',
    difficulty: 'advanced',
    dependencies: ['poke-detail-view', 'poke-search-filter'],
    unlockRule: 'all',
  },
  {
    id: 'poke-favourites',
    api: 'pokeapi',
    title: 'Favourite Pokemon',
    description:
      'Add a way for users to star Pokemon and show favourites in a dedicated section.',
    acceptanceCriteria: [
      'A favourite toggle exists on list or detail items',
      'Favourite state persists in browser storage',
      'A favourites-only view is available',
    ],
    priority: 'low',
    difficulty: 'intermediate',
    dependencies: ['poke-detail-view', 'poke-search-filter'],
    unlockRule: 'any',
  },
  {
    id: 'swapi-fetch-films',
    api: 'swapi',
    title: 'Fetch films list',
    description:
      'Create a reusable request for films and render core details like title and release date.',
    acceptanceCriteria: [
      'Films endpoint is called from a service function',
      'UI shows title and release date for each film',
      'Loading and error states are present',
    ],
    priority: 'high',
    difficulty: 'beginner',
  },
  {
    id: 'swapi-film-detail',
    api: 'swapi',
    title: 'Film detail screen',
    description:
      'Display one film in detail with opening crawl and key metadata in a readable layout.',
    acceptanceCriteria: [
      'Film detail can be opened from the list',
      'Opening crawl text is readable',
      'At least three metadata fields are displayed',
    ],
    priority: 'high',
    difficulty: 'intermediate',
    dependencies: ['swapi-fetch-films'],
  },
  {
    id: 'swapi-character-list',
    api: 'swapi',
    title: 'Character explorer',
    description:
      'Show characters for a selected film and support pagination for long lists.',
    acceptanceCriteria: [
      'Characters for a selected film are displayed',
      'Pagination or incremental loading is implemented',
      'Character cards include name and at least one extra field',
    ],
    priority: 'medium',
    difficulty: 'intermediate',
    dependencies: ['swapi-film-detail'],
  },
  {
    id: 'swapi-comparison-view',
    api: 'swapi',
    title: 'Character comparison',
    description:
      'Allow users to compare two selected characters side by side for key attributes.',
    acceptanceCriteria: [
      'Users can select two characters',
      'Comparison layout shows both values clearly',
      'Empty selection states are handled',
    ],
    priority: 'medium',
    difficulty: 'advanced',
    dependencies: ['swapi-character-list', 'swapi-film-detail'],
    unlockRule: 'all',
  },
  {
    id: 'swapi-saved-search',
    api: 'swapi',
    title: 'Saved film filters',
    description:
      'Persist user filter choices for films so they return on refresh.',
    acceptanceCriteria: [
      'At least one filter can be saved',
      'Filter state restores after refresh',
      'Users can clear saved filters',
    ],
    priority: 'low',
    difficulty: 'intermediate',
    dependencies: ['swapi-film-detail', 'swapi-character-list'],
    unlockRule: 'any',
  },
]

export const TASKS_BY_API: Record<ApiKey, TaskDefinition[]> = {
  pokeapi: TASKS.filter((task) => task.api === 'pokeapi'),
  swapi: TASKS.filter((task) => task.api === 'swapi'),
}

export function createDefaultTaskBoardState(): PersistedTaskState {
  const progress = {} as PersistedTaskState['progress']

  for (const option of API_OPTIONS) {
    const apiTasks = TASKS_BY_API[option.key]
    const apiProgress: ApiTaskProgress = {}

    for (const task of apiTasks) {
      apiProgress[task.id] = {
        status: 'todo',
        checks: task.acceptanceCriteria.map(() => false),
      }
    }

    progress[option.key] = apiProgress
  }

  return { selectedApi: null, progress }
}

function normaliseTaskProgress(
  api: ApiKey,
  incoming: unknown,
): ApiTaskProgress {
  const defaults: ApiTaskProgress = {}

  const incomingObject =
    incoming && typeof incoming === 'object'
      ? (incoming as Record<string, unknown>)
      : {}

  for (const task of TASKS_BY_API[api]) {
    const saved = incomingObject[task.id]
    const savedObject =
      saved && typeof saved === 'object' ? (saved as Record<string, unknown>) : {}

    const status =
      savedObject.status === 'todo' ||
      savedObject.status === 'in-progress' ||
      savedObject.status === 'done'
        ? savedObject.status
        : 'todo'

    const rawChecks = Array.isArray(savedObject.checks) ? savedObject.checks : []
    const checks = task.acceptanceCriteria.map((_, index) => rawChecks[index] === true)

    defaults[task.id] = {
      status,
      checks,
    }
  }

  return defaults
}

export function loadTaskBoardState(): PersistedTaskState {
  const fallback = createDefaultTaskBoardState()

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(TASK_BOARD_STORAGE_KEY)
    if (!raw) {
      return fallback
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>
    const progress =
      parsed.progress && typeof parsed.progress === 'object'
        ? (parsed.progress as Record<string, unknown>)
        : {}

    const selected =
      parsed.selectedApi === 'pokeapi' || parsed.selectedApi === 'swapi'
        ? parsed.selectedApi
        : null

    return {
      selectedApi: selected,
      progress: {
        pokeapi: normaliseTaskProgress('pokeapi', progress.pokeapi),
        swapi: normaliseTaskProgress('swapi', progress.swapi),
      },
    }
  } catch {
    return fallback
  }
}

export function saveTaskBoardState(state: PersistedTaskState): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(TASK_BOARD_STORAGE_KEY, JSON.stringify(state))
}
