export type ApiKey = 'pokeapi'
export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type UnlockRule = 'all' | 'any'
export type PriorityTag = 'low' | 'medium' | 'high'
export type DifficultyTag = 'beginner' | 'intermediate' | 'advanced'
export type SessionTag = 'session-1' | 'session-2-plus'

export interface TaskDefinition {
  id: string
  api: ApiKey
  title: string
  description: string
  acceptanceCriteria: string[]
  guideSlugs?: string[]
  priority: PriorityTag
  difficulty: DifficultyTag
  session: SessionTag
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
]

export const KANBAN_COLUMNS: Array<{ key: TaskStatus; label: string }> = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
]

interface ApiTrackCopy {
  api: ApiKey
  prefix: string
  singular: string
  plural: string
  sourceName: string
}

const API_TRACKS: ApiTrackCopy[] = [
  {
    api: 'pokeapi',
    prefix: 'poke',
    singular: 'Pokemon',
    plural: 'Pokemon',
    sourceName: 'PokeAPI',
  },
]

function buildTaskDefinitions(track: ApiTrackCopy): TaskDefinition[] {
  const backgroundId = `${track.prefix}-change-background`
  const pageId = `${track.prefix}-create-page`
  const navbarId = `${track.prefix}-add-navbar-link`
  const copyId = `${track.prefix}-update-copy`
  const pageTitleId = `${track.prefix}-page-title`
  const buttonId = `${track.prefix}-add-button`
  const fetchListId = `${track.prefix}-fetch-list`
  const detailRouteId = `${track.prefix}-detail-route`
  const searchId = `${track.prefix}-search`
  const filterId = `${track.prefix}-filter`
  const resultCountId = `${track.prefix}-result-count`
  const backButtonId = `${track.prefix}-back-button`
  const resetControlsId = `${track.prefix}-reset-controls`
  const notFoundId = `${track.prefix}-not-found`
  const viewToggleId = `${track.prefix}-view-toggle`
  const favouritesId = `${track.prefix}-favourites`
  const customItemId = `${track.prefix}-custom-item`
  const collectionId = `${track.prefix}-collection`
  const sortingId = `${track.prefix}-sorting`
  const notesId = `${track.prefix}-notes`

  return [
    {
      id: backgroundId,
      api: track.api,
      title: 'Change the background colour',
      description:
        'Update one of the main page backgrounds with Tailwind classes so the app looks visibly different.',
      acceptanceCriteria: [
        'A background colour has been changed using Tailwind utility classes',
        'Text still has enough contrast to stay readable',
        'The change is visible on a main screen such as Home, Tasks, or Guides',
      ],
      guideSlugs: ['changing-background-colour', 'styling-with-tailwind'],
      priority: 'high',
      difficulty: 'beginner',
      session: 'session-1',
    },
    {
      id: pageId,
      api: track.api,
      title: 'Create the list page and route',
      description:
        'Add the list page component for this API track and connect it to the router, without building the full feature yet.',
      acceptanceCriteria: [
        'A list page component exists in `src/pages` for this API track',
        'A matching route has been added in `src/App.tsx`',
        'The page renders a heading and a short paragraph, even if no API data is shown yet',
      ],
      guideSlugs: ['creating-a-route-and-page', 'react-basics'],
      priority: 'high',
      difficulty: 'beginner',
      session: 'session-1',
    },
    {
      id: navbarId,
      api: track.api,
      title: 'Add a navbar link to the list page',
      description:
        'Extend the navbar so users can open the list page they just created without typing the URL manually.',
      acceptanceCriteria: [
        'A new navigation item has been added to the navbar for the list page',
        'Clicking the link opens the list page without a full refresh',
        'The active page styling still works when the new link is selected',
      ],
      guideSlugs: ['adding-navigation-links', 'creating-a-route-and-page'],
      priority: 'medium',
      difficulty: 'beginner',
      session: 'session-1',
      dependencies: [pageId],
    },
    {
      id: copyId,
      api: track.api,
      title: 'Update the home page text',
      description:
        'Change some of the starter copy on the home page, such as the `DB Work Experience` text, so the project feels more personal.',
      acceptanceCriteria: [
        'At least one heading or paragraph on the home page has been changed',
        'The updated text makes the page feel more like the student project',
        'The content still fits the layout on mobile and desktop',
      ],
      guideSlugs: ['editing-page-content', 'react-basics'],
      priority: 'medium',
      difficulty: 'beginner',
      session: 'session-1',
    },
    {
      id: pageTitleId,
      api: track.api,
      title: 'Change the browser tab title',
      description:
        'Update the title shown in the browser tab so it better matches the student project or chosen API.',
      acceptanceCriteria: [
        'The browser tab shows a new page title',
        'The title makes sense for the page or project',
        'The title is updated in the right place in the code rather than being repeated in multiple places',
      ],
      guideSlugs: ['changing-the-browser-tab-title', 'editing-page-content'],
      priority: 'medium',
      difficulty: 'beginner',
      session: 'session-1',
    },
    {
      id: buttonId,
      api: track.api,
      title: 'Add a button on the home page',
      description:
        'Add a button to the home page that takes the user to the list page for this API track.',
      acceptanceCriteria: [
        'A button has been added to the home page',
        'Clicking the button opens the list page for this API track',
        'The button text makes its destination clear',
        'The button includes hover or focus styles using Tailwind classes',
      ],
      guideSlugs: ['adding-a-button', 'styling-with-tailwind', 'react-basics'],
      priority: 'low',
      difficulty: 'beginner',
      session: 'session-1',
      dependencies: [pageId],
    },
    {
      id: fetchListId,
      api: track.api,
      title: `Fetch and show a list of ${track.plural}`,
      description: `Load data from the ${track.sourceName}, store it in component state, render the results on the list page, and let users move through the results clearly if there are lots of items.`,
      acceptanceCriteria: [
        `The page makes a request to the ${track.sourceName}`,
        `The page shows a visible list or grid of ${track.plural}`,
        `Each item displays at least one useful piece of information about the ${track.singular}`,
        'Each item includes a picture or image where the chosen API provides one',
        'If there are lots of results, the page includes clear controls to move between result pages or batches',
        'The page clearly shows when the data has loaded successfully',
      ],
      guideSlugs: ['fetching-api-data', 'react-basics', 'styling-with-tailwind'],
      priority: 'high',
      difficulty: 'beginner',
      session: 'session-2-plus',
      dependencies: [pageId],
    },
    {
      id: detailRouteId,
      api: track.api,
      title: `Add a detail page for one ${track.singular}`,
      description: `Make each list item clickable, open a second page for an individual ${track.singular}, and show useful detail data on that page.`,
      acceptanceCriteria: [
        'Clicking a list item opens a dedicated detail page',
        'The detail page has its own route',
        `The detail page shows information for the selected ${track.singular}`,
        'The detail page includes at least three useful pieces of information',
      ],
      guideSlugs: ['creating-a-route-and-page', 'adding-navigation-links', 'fetching-api-data', 'react-basics'],
      priority: 'high',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [fetchListId],
    },
    {
      id: searchId,
      api: track.api,
      title: `Add search for ${track.plural}`,
      description: `Let users search the list page so they can quickly find a specific ${track.singular}.`,
      acceptanceCriteria: [
        'A search input is visible on the list page',
        `Typing into the search input changes which ${track.plural} are shown`,
        'The page still communicates clearly when no matching results are found',
      ],
      guideSlugs: ['search-and-filtering', 'react-basics'],
      priority: 'medium',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [fetchListId],
    },
    {
      id: filterId,
      api: track.api,
      title: `Add filtering to the ${track.plural} list`,
      description: `Add at least one filter control so users can narrow down the ${track.plural} they see.`,
      acceptanceCriteria: [
        'At least one filter control is visible on the list page',
        `Changing the filter updates which ${track.plural} are shown`,
        'Search and filtering work together without breaking the list',
      ],
      guideSlugs: ['search-and-filtering', 'styling-with-tailwind'],
      priority: 'medium',
      difficulty: 'advanced',
      session: 'session-2-plus',
      dependencies: [fetchListId, searchId],
    },
    {
      id: resultCountId,
      api: track.api,
      title: `Show how many ${track.plural} are on the page`,
      description: `Show a small result count above the list so users can see how many ${track.plural} are currently being displayed.`,
      acceptanceCriteria: [
        'A result count is visible on the list page',
        'The number updates when search, filters, or sorting change',
        'The text is easy to spot and understand',
      ],
      guideSlugs: ['react-basics', 'search-and-filtering'],
      priority: 'low',
      difficulty: 'beginner',
      session: 'session-2-plus',
      dependencies: [fetchListId],
    },
    {
      id: backButtonId,
      api: track.api,
      title: 'Add a back button to the detail page',
      description:
        'Add a clear way for users to go back to the list page after opening one item.',
      acceptanceCriteria: [
        'A visible back link or button appears on the detail page',
        'Clicking it returns the user to the list page',
        'The back action works without a full page refresh',
      ],
      guideSlugs: ['adding-navigation-links', 'creating-a-route-and-page'],
      priority: 'medium',
      difficulty: 'beginner',
      session: 'session-2-plus',
      dependencies: [detailRouteId],
    },
    {
      id: resetControlsId,
      api: track.api,
      title: 'Add a reset button for search and filters',
      description:
        'Let users clear their search and filter choices in one click and return to the full list.',
      acceptanceCriteria: [
        'A reset or clear button is visible near the search and filter controls',
        'Clicking it clears the current search text',
        'Clicking it resets all filters back to their starting values',
        `The full list of ${track.plural} appears again after reset`,
      ],
      guideSlugs: ['search-and-filtering', 'react-basics'],
      priority: 'medium',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [searchId, filterId],
    },
    {
      id: notFoundId,
      api: track.api,
      title: `Show a message when a ${track.singular} cannot be found`,
      description:
        'If a user opens a detail page for an item that does not exist, show a helpful message instead of a broken page.',
      acceptanceCriteria: [
        `A clear message appears when the ${track.singular} cannot be found`,
        'The app does not crash or show a blank screen',
        'The page includes a link or button back to the main list',
      ],
      guideSlugs: ['creating-a-route-and-page', 'fetching-api-data', 'react-basics'],
      priority: 'medium',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [detailRouteId],
    },
    {
      id: viewToggleId,
      api: track.api,
      title: 'Add a list view and a grid view',
      description:
        'Let users switch between two different layouts for viewing the same data.',
      acceptanceCriteria: [
        'A control lets the user switch between list view and grid view',
        `Both views show the same ${track.plural}`,
        'The layout changes clearly when the user switches view',
        'The page still works well on mobile and desktop',
      ],
      guideSlugs: ['styling-with-tailwind', 'react-basics'],
      priority: 'low',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [fetchListId],
    },
    {
      id: favouritesId,
      api: track.api,
      title: `Add favourites for ${track.plural}`,
      description: `Let users save favourite ${track.plural} and find them again later.`,
      acceptanceCriteria: [
        `Users can mark and unmark ${track.plural} as favourites`,
        'Favourite items are shown in a clear place in the app',
        'Favourites stay saved after a page refresh using local storage or similar browser storage',
      ],
      guideSlugs: ['saving-browser-data', 'react-basics'],
      priority: 'medium',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [fetchListId, detailRouteId],
    },
    {
      id: customItemId,
      api: track.api,
      title: `Create your own ${track.singular}`,
      description: `Add a form so users can create their own custom ${track.singular} inspired by the ${track.sourceName}.`,
      acceptanceCriteria: [
        `A form lets users enter information for a custom ${track.singular}`,
        `The created ${track.singular} is shown somewhere in the app after submission`,
        'The form has clear labels and basic validation for required fields',
      ],
      guideSlugs: ['building-forms', 'styling-with-tailwind', 'react-basics'],
      priority: 'medium',
      difficulty: 'advanced',
      session: 'session-2-plus',
      dependencies: [pageId],
    },
    {
      id: collectionId,
      api: track.api,
      title: `Create a ${track.api === 'pokeapi' ? 'team' : 'collection'}`,
      description: `Let users build their own group of ${track.plural}, such as a team, watchlist, squad, or crew.`,
      acceptanceCriteria: [
        `Users can add ${track.plural} to a custom collection`,
        'The collection is shown on the page in a clear list or section',
        'Users can remove items from the collection after adding them',
      ],
      guideSlugs: ['working-with-lists-and-sorting', 'saving-browser-data', 'react-basics'],
      priority: 'medium',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [fetchListId],
    },
    {
      id: sortingId,
      api: track.api,
      title: `Add sorting to the ${track.plural} list`,
      description: `Let users sort the ${track.plural} in a useful order for this API track.`,
      acceptanceCriteria: [
        'A sort control is visible on the list page',
        `Changing the sort order updates how the ${track.plural} are displayed`,
        'Sorting works without breaking the existing list layout or interactions',
      ],
      guideSlugs: ['working-with-lists-and-sorting', 'react-basics'],
      priority: 'medium',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [fetchListId],
    },
    {
      id: notesId,
      api: track.api,
      title: `Add personal notes to a ${track.singular}`,
      description: `Let users write their own notes or comments about a ${track.singular}.`,
      acceptanceCriteria: [
        `Users can add a note for an individual ${track.singular}`,
        'The saved note is shown clearly in the app',
        'Notes stay saved after a page refresh using local storage or similar browser storage',
      ],
      guideSlugs: ['building-forms', 'saving-browser-data', 'react-basics'],
      priority: 'low',
      difficulty: 'intermediate',
      session: 'session-2-plus',
      dependencies: [detailRouteId],
    },
  ]
}

export const TASKS: TaskDefinition[] = API_TRACKS.flatMap(buildTaskDefinitions)

export const TASKS_BY_API: Record<ApiKey, TaskDefinition[]> = {
  pokeapi: TASKS.filter((task) => task.api === 'pokeapi'),
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

    const selected = parsed.selectedApi === 'pokeapi' ? parsed.selectedApi : null

    return {
      selectedApi: selected,
      progress: {
        pokeapi: normaliseTaskProgress('pokeapi', progress.pokeapi),
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
