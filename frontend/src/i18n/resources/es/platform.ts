const platformEs = {
  board: {
    apiBadge: 'Datos API',
    createdAt: 'Creado {{value}}',
    emptyDescription:
      'Prueba una palabra clave más amplia o limpia los filtros activos.',
    emptyTitle: 'No hay solicitudes para esta búsqueda',
    errorDescription:
      'Verifica la conexión con el API o sigue usando los datos simulados durante el desarrollo.',
    errorTitle: 'No pudimos cargar las solicitudes',
    mockBadge: 'Datos simulados',
    rankSignal: 'Alta señal',
    refreshing: 'Actualizando datos...',
    refresh: 'Actualizar',
    resultsCount: '{{count}} solicitudes',
    searchLabel: 'Buscar solicitudes',
    searchPlaceholder: 'Busca por título o descripción',
    sectionDescription:
      'Busca, ordena e inspecciona las ideas con mayor señal de demanda.',
    sectionEyebrow: 'Espacio de descubrimiento',
    sectionTitle: 'Solicitudes populares',
    sortLabel: 'Ordenar solicitudes',
    sortNewest: 'Más recientes',
    sortVotes: 'Más votadas',
    submittedBy: 'Enviada por {{name}}',
    votes: '{{count}} votos',
  },
  form: {
    clear: 'Limpiar formulario',
    description:
      'El formulario ya tiene reglas compartidas de validación y está listo para conectarse al API.',
    descriptionLabel: 'Descripción',
    descriptionPlaceholder:
      'Explica el problema, el valor esperado y cualquier contexto útil',
    eyebrow: 'Flujo de envío',
    errors: {
      descriptionMin: 'La descripción debe tener al menos 20 caracteres.',
      descriptionRequired: 'La descripción es obligatoria.',
      titleMin: 'El título debe tener al menos 5 caracteres.',
      titleRequired: 'El título de la funcionalidad es obligatorio.',
    },
    helper:
      'Esta ruta ya está preparada desde el frontend y todavía no guarda nada en el servidor.',
    submit: 'Guardar borrador',
    success:
      'La validación del borrador fue exitosa. El siguiente paso es conectar el endpoint de creación.',
    title: 'Captura una nueva idea de producto',
    titleLabel: 'Título de la funcionalidad',
    titlePlaceholder: 'Resume la solicitud en una sola frase',
  },
  hero: {
    description:
      'Un andamiaje frontend para descubrir, priorizar y proponer ideas de producto antes de tener el API en vivo.',
    eyebrow: 'Sistema de votación de funcionalidades',
    primaryAction: 'Explorar solicitudes',
    secondaryAction: 'Crear una solicitud',
    title: 'Mira lo que los clientes quieren después.',
  },
  language: {
    english: 'Inglés',
    label: 'Idioma',
    spanish: 'Español',
  },
  meta: {
    appName: 'Radar de Demanda',
    tagline: 'Convierte la demanda de la comunidad en señales priorizadas.',
  },
  navigation: {
    browse: 'Explorar solicitudes',
    label: 'Navegación principal',
    submit: 'Enviar solicitud',
  },
  notFound: {
    action: 'Volver al tablero',
    description:
      'La ruta solicitada no hace parte del andamiaje inicial.',
    title: 'Página no encontrada',
  },
  stats: {
    none: 'Sin datos aún',
    requests: 'Solicitudes',
    topIdea: 'Mejor posicionada',
    votes: 'Votos registrados',
  },
} as const

export default platformEs
