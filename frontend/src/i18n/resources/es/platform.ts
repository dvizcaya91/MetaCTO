const platformEs = {
  auth: {
    errors: {
      invalidCredentials: 'Usuario o contraseña inválidos.',
      network:
        'El servidor no está disponible en este momento. Verifica la conexión e intenta de nuevo.',
      unexpected: 'No pudimos completar la solicitud. Intenta nuevamente en un momento.',
      validation: 'Revisa los campos resaltados e intenta de nuevo.',
    },
    sessionExpired:
      'No se pudo restaurar la sesión guardada. Inicia sesión nuevamente.',
  },
  common: {
    loading: 'Procesando...',
  },
  dashboard: {
    cards: {
      accessDescription:
        'El token de acceso permanece solo en el contexto de React y se inyecta en Axios en tiempo de ejecución.',
      accessMissing: 'No cargado',
      accessPresent: 'Cargado en memoria',
      accessTitle: 'Token de acceso',
      refreshDescription:
        'El token de refresco se guarda localmente para intentar restaurar la sesión después de recargar.',
      refreshMissing: 'No disponible',
      refreshPresent: 'Guardado localmente',
      refreshTitle: 'Token de refresco',
      sessionActive: 'Activa',
      sessionDescription:
        'Este dashboard es público, pero el panel refleja si la autenticación está activa en este momento.',
      sessionInactive: 'Invitado',
      sessionTitle: 'Estado de la sesión',
    },
    description:
      'Un dashboard público que muestra el estado actual de autenticación, el ciclo de vida de los tokens y las siguientes acciones.',
    eyebrow: 'Resumen del dashboard',
    routeVisibility: 'Acceso a la ruta',
    routeVisibilityValue: 'Página pública',
    summary: {
      authenticatedDescription:
        'El token de acceso está activo en memoria y el token de refresco sigue disponible para el próximo intento de restauración.',
      authenticatedLabel: 'Sesión activa',
      authenticatedTitle: 'La autenticación está activa',
      guestDescription:
        'Puedes navegar esta página sin sesión, pero necesitas login o signup para obtener tokens.',
      guestLabel: 'Modo invitado',
      guestTitle: 'No hay autenticación activa',
      loginAction: 'Ir a login',
      signupAction: 'Crear cuenta',
    },
    title: 'Supervisa el estado de la sesión desde una sola superficie de control.',
  },
  language: {
    english: 'Inglés',
    label: 'Idioma',
    spanish: 'Español',
  },
  login: {
    eyebrow: 'Bienvenido de nuevo',
    footerAction: 'Créala ahora',
    footerPrompt: '¿Necesitas una cuenta?',
    formDescription:
      'Inicia sesión para enviar ideas, votar por las solicitudes que apoyas y seguir las mejoras más pedidas del producto.',
    formTitle: 'Inicia sesión en la plataforma',
    heroDescription:
      'Entra a tu espacio de votación de funcionalidades y vuelve a priorizar solicitudes, respaldar ideas con votos y seguir lo que la comunidad quiere después.',
    highlights: {
      fastAccess: 'Vuelve al tablero priorizado al instante',
      memoryOnly: 'Vota y revisa ideas desde un solo espacio',
      refreshReady: 'Mantén tu sesión lista entre recargas',
    },
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Ingresa tu contraseña',
    secondaryAction: 'Abrir signup',
    submit: 'Iniciar sesión',
    title: 'Continúa donde las solicitudes se convierten en señales de producto.',
    usernameLabel: 'Usuario',
    usernamePlaceholder: 'Ingresa tu usuario',
    validation: {
      passwordRequired: 'La contraseña es obligatoria.',
      usernameRequired: 'El usuario es obligatorio.',
    },
  },
  meta: {
    appName: 'MetaCTO Feature Voting',
    tagline: 'Vota, prioriza y destaca las ideas que más piden los usuarios.',
  },
  navigation: {
    dashboard: 'Dashboard',
    label: 'Navegación principal',
    login: 'Login',
    signup: 'Signup',
  },
  notFound: {
    action: 'Ir a login',
    description: 'La página solicitada no hace parte del flujo actual del frontend.',
    title: 'Página no encontrada',
  },
  session: {
    authenticated: 'Autenticado',
    guest: 'Sesión invitada',
    restoring: 'Restaurando sesión',
    signOut: 'Cerrar sesión',
  },
  signup: {
    eyebrow: 'Únete al tablero',
    footerAction: 'Inicia sesión',
    footerPrompt: '¿Ya tienes una cuenta?',
    formDescription:
      'Crea tu cuenta para publicar solicitudes, apoyar ideas con votos y ayudar a definir la hoja de ruta del producto.',
    formTitle: 'Crea tu cuenta',
    heroDescription:
      'Únete a la plataforma de votación de funcionalidades con un registro simple y empieza a proponer mejoras y respaldar las solicitudes que más importan.',
    highlights: {
      instantTokens: 'Empieza a publicar y votar justo después del registro',
      passwordValidation: 'La creación de cuenta sigue siendo directa y clara',
      publicFlow: 'Estados de recuperación claros si algo falla',
    },
    passwordConfirmationLabel: 'Confirmar contraseña',
    passwordConfirmationPlaceholder: 'Repite la contraseña',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Crea una contraseña segura',
    secondaryAction: 'Volver a login',
    submit: 'Crear cuenta',
    title: 'Crea tu cuenta y empieza a moldear la hoja de ruta.',
    usernameLabel: 'Usuario',
    usernamePlaceholder: 'Elige un usuario',
    validation: {
      passwordConfirmationMismatch: 'La confirmación debe coincidir con la contraseña.',
      passwordConfirmationRequired: 'Confirma la contraseña.',
      passwordMinLength: 'Usa al menos 8 caracteres.',
      passwordRequired: 'La contraseña es obligatoria.',
      usernameRequired: 'El usuario es obligatorio.',
    },
  },
} as const

export default platformEs
