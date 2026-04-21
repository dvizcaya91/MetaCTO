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
    description:
      'Explora solicitudes de funcionalidades, ordena las señales de demanda, busca por coincidencia exacta y vota por las ideas que merecen prioridad.',
    eyebrow: 'Dashboard de votación',
    guestPromptDescription:
      'Los invitados pueden explorar todas las funcionalidades. Inicia sesión para votar, quitar votos y usar las pestañas personalizadas de tus propias solicitudes y votos.',
    guestPromptLogin: 'Iniciar sesión',
    guestPromptSignup: 'Crear cuenta',
    guestPromptTitle: 'Activa la votación y los filtros personalizados',
    searchModeLabel: 'Modo de búsqueda',
    searchModeValue:
      'La búsqueda revisa coincidencias exactas sobre el título o la descripción y mantiene el orden y la paginación alineados.',
    titleAuthenticated:
      'Bienvenido de nuevo, {{username}}. Esto es lo que la hoja de ruta necesita ahora.',
    titleGuest: 'Mira qué ideas de funcionalidades están subiendo a la cima.',
  },
  features: {
    cards: {
      createdAt: 'Creado {{value}}',
      lastVotedAt: 'Último voto {{value}}',
      loginToVote: 'Inicia sesión para votar',
      neverVoted: 'Sin votos todavía',
      owned: 'Mi funcionalidad',
      ownerVoteLocked: 'Tu funcionalidad',
      unvote: 'Quitar voto',
      unvoting: 'Quitando voto...',
      vote: 'Votar',
      voteCount: '{{count}} votos',
      voted: 'Votada',
      voting: 'Votando...',
    },
    controls: {
      refresh: 'Reintentar',
      searchLabel: 'Búsqueda exacta',
      searchPlaceholder: 'Coincide con el título o la descripción completos',
      sortLabel: 'Ordenar funcionalidades',
    },
    create: {
      cancel: 'Cancelar',
      close: 'Cerrar modal',
      description:
        'Describe claramente la mejora para que otros usuarios la entiendan y decidan si quieren votarla.',
      descriptionLabel: 'Descripción',
      descriptionPlaceholder:
        'Explica la solicitud y el problema que esta funcionalidad resolvería',
      errors: {
        network:
          'No fue posible crear la funcionalidad en este momento. Verifica la conexión e intenta nuevamente.',
        unauthorized:
          'Necesitas iniciar sesión nuevamente antes de crear una funcionalidad.',
        unexpected:
          'No pudimos crear la funcionalidad. Intenta otra vez en un momento.',
        validation: 'Revisa los campos e intenta nuevamente.',
      },
      open: 'Solicitar nueva funcionalidad',
      submit: 'Crear funcionalidad',
      submitting: 'Creando funcionalidad...',
      title: 'Solicitar una nueva funcionalidad',
      titleLabel: 'Título',
      titlePlaceholder: 'Resume la idea en un título corto',
      validation: {
        descriptionMin: 'Usa al menos 10 caracteres en la descripción.',
        descriptionRequired: 'La descripción es obligatoria.',
        titleMin: 'Usa al menos 3 caracteres en el título.',
        titleRequired: 'El título es obligatorio.',
      },
    },
    description:
      'Usa búsqueda exacta, pestañas personalizadas y controles de voto para enfocarte en las oportunidades de producto más relevantes.',
    empty: {
      description:
        'Prueba otra pestaña, cambia el orden o busca otro título o descripción exactos.',
      title: 'Ninguna funcionalidad coincide con estos filtros',
    },
    errors: {
      network:
        'El servicio de votación no está disponible en este momento. Verifica la conexión e intenta nuevamente.',
      notFound: 'Esta funcionalidad ya no está disponible.',
      title: 'No pudimos cargar la lista de funcionalidades',
      unexpected: 'Algo salió mal al actualizar el voto. Intenta de nuevo.',
    },
    eyebrow: 'Inventario de funcionalidades',
    pagination: {
      next: 'Siguiente',
      page: 'Página {{current}} de {{total}}',
      previous: 'Anterior',
    },
    sort: {
      lastCreated: 'Últimas creadas',
      lastVoted: 'Último voto',
      mostVotes: 'Más votos',
    },
    tabs: {
      all: 'Todas',
      mine: 'Mías',
      voted: 'Votadas por mí',
    },
    title: 'Solicitudes de funcionalidades ordenadas por demanda',
    totalLabel: 'Funcionalidades encontradas',
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
