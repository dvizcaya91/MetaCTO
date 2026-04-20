const platformEn = {
  board: {
    apiBadge: 'API data',
    createdAt: 'Created {{value}}',
    emptyDescription: 'Try a broader keyword or clear the active filters.',
    emptyTitle: 'No requests match this search',
    errorDescription:
      'Check the API connection or keep using the mocked fallback data during development.',
    errorTitle: 'We could not load requests',
    mockBadge: 'Mock data',
    rankSignal: 'High signal',
    refreshing: 'Refreshing data...',
    refresh: 'Refresh',
    resultsCount: '{{count}} requests',
    searchLabel: 'Search requests',
    searchPlaceholder: 'Search by title or description',
    sectionDescription:
      'Search, sort, and inspect the ideas with the highest demand signal.',
    sectionEyebrow: 'Discovery workspace',
    sectionTitle: 'Popular feature requests',
    sortLabel: 'Sort requests',
    sortNewest: 'Newest',
    sortVotes: 'Most voted',
    submittedBy: 'Submitted by {{name}}',
    votes: '{{count}} votes',
  },
  form: {
    clear: 'Clear form',
    description:
      'The form is scaffolded with shared validation rules and ready for API wiring.',
    descriptionLabel: 'Description',
    descriptionPlaceholder:
      'Explain the problem, expected value, and any context',
    eyebrow: 'Submission workflow',
    errors: {
      descriptionMin: 'The description must contain at least 20 characters.',
      descriptionRequired: 'A description is required.',
      titleMin: 'The title must contain at least 5 characters.',
      titleRequired: 'A feature title is required.',
    },
    helper:
      'This route is frontend-ready and currently stores nothing on the server.',
    submit: 'Save draft',
    success: 'Draft validation passed. Connect the mutation endpoint next.',
    title: 'Capture a new product idea',
    titleLabel: 'Feature title',
    titlePlaceholder: 'Summarize the request in one sentence',
  },
  hero: {
    description:
      'A frontend scaffold for discovering, ranking, and proposing product ideas before the live API arrives.',
    eyebrow: 'Feature voting system',
    primaryAction: 'Explore requests',
    secondaryAction: 'Create a request',
    title: 'See what customers want next.',
  },
  language: {
    english: 'English',
    label: 'Language',
    spanish: 'Spanish',
  },
  meta: {
    appName: 'Feature Demand Radar',
    tagline: 'Turn community demand into ranked product signals.',
  },
  navigation: {
    browse: 'Browse requests',
    label: 'Primary navigation',
    submit: 'Submit request',
  },
  notFound: {
    action: 'Return to request board',
    description: 'The route you requested is not part of the initial scaffold.',
    title: 'Page not found',
  },
  stats: {
    none: 'No data yet',
    requests: 'Requests',
    topIdea: 'Top ranked',
    votes: 'Votes tracked',
  },
} as const

export default platformEn
