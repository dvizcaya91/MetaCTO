const platformEn = {
  auth: {
    errors: {
      invalidCredentials: 'Invalid username or password.',
      network: 'The server is unavailable right now. Check the connection and try again.',
      unexpected: 'We could not complete the request. Try again in a moment.',
      validation: 'Please review the highlighted fields and try again.',
    },
    sessionExpired:
      'Your saved session could not be restored. Please log in again.',
  },
  common: {
    loading: 'Working...',
  },
  dashboard: {
    description:
      'Browse feature requests, sort demand signals, search for exact titles or descriptions, and vote on the ideas that deserve priority.',
    eyebrow: 'Voting dashboard',
    guestPromptDescription:
      'Guests can browse all features. Log in to vote, unvote, and use the personalized tabs for your own and voted features.',
    guestPromptLogin: 'Log in',
    guestPromptSignup: 'Create account',
    guestPromptTitle: 'Unlock voting and personalized filters',
    searchModeLabel: 'Search mode',
    searchModeValue:
      'Search checks for exact matches on feature title or description and keeps sorting and pagination in sync.',
    titleAuthenticated: 'Welcome back, {{username}}. Here is what the roadmap needs next.',
    titleGuest: 'See which feature ideas are climbing to the top.',
  },
  features: {
    cards: {
      createdAt: 'Created {{value}}',
      lastVotedAt: 'Last voted {{value}}',
      loginToVote: 'Log in to vote',
      neverVoted: 'No votes yet',
      owned: 'My feature',
      ownerVoteLocked: 'Your feature',
      unvote: 'Remove vote',
      unvoting: 'Removing vote...',
      vote: 'Vote',
      voteCount: '{{count}} votes',
      voted: 'Voted',
      voting: 'Voting...',
    },
    controls: {
      refresh: 'Retry',
      searchLabel: 'Exact search',
      searchPlaceholder: 'Match the full title or description',
      sortLabel: 'Sort features',
    },
    create: {
      cancel: 'Cancel',
      close: 'Close modal',
      description:
        'Describe the improvement clearly so other users can understand it and decide whether to vote for it.',
      duplicate: {
        accept: 'Accept suggestion and vote',
        acceptError:
          'We could not apply the suggested vote right now. Try again in a moment.',
        acceptSubmitting: 'Accepting suggestion...',
        createdAt: 'Created {{value}}',
        eyebrow: 'Similar request found',
        force: 'These features are different',
        forceSubmitting: 'Retrying with override...',
        reasonLabel: 'Why this looks the same: {{reason}}',
        suggestedBadge: 'Suggested feature',
        summary:
          'A similar feature request already exists. Review the suggested feature below.',
        title: 'A matching feature request is already on the board',
      },
      descriptionLabel: 'Description',
      descriptionPlaceholder:
        'Explain the feature request and the problem it solves',
      errors: {
        network:
          'The feature could not be created right now. Check the connection and try again.',
        unauthorized: 'You need to log in again before creating a feature.',
        unexpected: 'We could not create the feature. Try again in a moment.',
        validation: 'Please review the fields and try again.',
      },
      open: 'Request new feature',
      submit: 'Create feature',
      submitting: 'Creating feature...',
      title: 'Request a new feature',
      titleLabel: 'Title',
      titlePlaceholder: 'Summarize the idea in a short title',
      validation: {
        descriptionMin: 'Use at least 10 characters in the description.',
        descriptionRequired: 'Description is required.',
        titleMin: 'Use at least 3 characters in the title.',
        titleRequired: 'Title is required.',
      },
    },
    description:
      'Use exact search, personalized tabs, and vote controls to focus on the most meaningful product opportunities.',
    empty: {
      description:
        'Try a different tab, adjust the sort order, or search for a different exact title or description.',
      title: 'No features match these filters',
    },
    errors: {
      network:
        'The voting service is unavailable right now. Check the connection and try again.',
      notFound: 'This feature is no longer available.',
      title: 'We could not load the feature list',
      unexpected: 'Something went wrong while updating the vote. Try again.',
    },
    eyebrow: 'Feature inventory',
    pagination: {
      next: 'Next',
      page: 'Page {{current}} of {{total}}',
      previous: 'Previous',
    },
    sort: {
      lastCreated: 'Last created',
      lastVoted: 'Last voted',
      mostVotes: 'Most votes',
    },
    tabs: {
      all: 'All features',
      mine: 'My features',
      voted: 'Voted by me',
    },
    title: 'Feature requests ranked by community demand',
    totalLabel: 'Matching features',
  },
  language: {
    english: 'English',
    label: 'Language',
    spanish: 'Spanish',
  },
  login: {
    eyebrow: 'Welcome back',
    footerAction: 'Create one now',
    footerPrompt: 'Need an account?',
    formDescription:
      'Log in to submit ideas, vote on the requests you support, and follow the most requested product improvements.',
    formTitle: 'Log into the platform',
    heroDescription:
      'Sign in to your feature voting workspace and jump back into ranking requests, backing ideas with votes, and tracking what the community wants next.',
    highlights: {
      fastAccess: 'Return to your ranked request board instantly',
      memoryOnly: 'Vote and review ideas from one clean workspace',
      refreshReady: 'Keep your session ready across page reloads',
    },
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    secondaryAction: 'Open signup',
    submit: 'Log in',
    title: 'Continue where feature requests turn into product signals.',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter your username',
    validation: {
      passwordRequired: 'Password is required.',
      usernameRequired: 'Username is required.',
    },
  },
  meta: {
    appName: 'MetaCTO Feature Voting',
    tagline: 'Vote, prioritize, and surface the ideas customers want most.',
  },
  navigation: {
    dashboard: 'Dashboard',
    label: 'Primary navigation',
    login: 'Login',
    signup: 'Signup',
  },
  notFound: {
    action: 'Go to login',
    description: 'The page you requested is not part of the current frontend flow.',
    title: 'Page not found',
  },
  session: {
    authenticated: 'Authenticated',
    guest: 'Guest session',
    restoring: 'Restoring session',
    signOut: 'Sign out',
  },
  signup: {
    eyebrow: 'Join the board',
    footerAction: 'Log in',
    footerPrompt: 'Already have an account?',
    formDescription:
      'Create your account to publish feature requests, support ideas with votes, and help shape the product roadmap.',
    formTitle: 'Create your account',
    heroDescription:
      'Join the feature voting platform with a simple account setup, then start proposing improvements and backing the requests that matter most.',
    highlights: {
      instantTokens: 'Start posting and voting right after signup',
      passwordValidation: 'Account creation stays focused and low friction',
      publicFlow: 'Clear recovery states if something goes wrong',
    },
    passwordConfirmationLabel: 'Confirm password',
    passwordConfirmationPlaceholder: 'Repeat the password',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a strong password',
    secondaryAction: 'Back to login',
    submit: 'Create account',
    title: 'Create an account and start shaping the roadmap.',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Choose a username',
    validation: {
      passwordConfirmationMismatch: 'The password confirmation must match.',
      passwordConfirmationRequired: 'Please confirm the password.',
      passwordMinLength: 'Use at least 8 characters.',
      passwordRequired: 'Password is required.',
      usernameRequired: 'Username is required.',
    },
  },
} as const

export default platformEn
