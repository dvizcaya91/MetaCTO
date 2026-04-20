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
    cards: {
      accessDescription:
        'The access token stays in React context only and is injected into Axios at runtime.',
      accessMissing: 'Not loaded',
      accessPresent: 'Loaded in memory',
      accessTitle: 'Access token',
      refreshDescription:
        'The refresh token is persisted locally so the app can attempt session restoration after a reload.',
      refreshMissing: 'Not available',
      refreshPresent: 'Stored locally',
      refreshTitle: 'Refresh token',
      sessionActive: 'Active',
      sessionDescription:
        'This dashboard is public, but the session panel reflects whether authentication is currently active.',
      sessionInactive: 'Guest',
      sessionTitle: 'Session status',
    },
    description:
      'A public dashboard that surfaces the current authentication state, token lifecycle, and next actions.',
    eyebrow: 'Dashboard overview',
    routeVisibility: 'Route access',
    routeVisibilityValue: 'Public page',
    summary: {
      authenticatedDescription:
        'The access token is active in memory and the refresh token remains available for the next reload attempt.',
      authenticatedLabel: 'Session live',
      authenticatedTitle: 'Authentication is active',
      guestDescription:
        'You can browse this page without a session, but login or signup is required to obtain tokens.',
      guestLabel: 'Guest mode',
      guestTitle: 'No active authentication',
      loginAction: 'Go to login',
      signupAction: 'Create account',
    },
    title: 'Track the session state from a single control surface.',
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
