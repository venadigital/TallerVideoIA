export interface ProgramMetric {
  value: string
  label: string
}

export interface SessionBlock {
  title: string
  objective: string
  bullets: string[]
}

export interface PaymentOption {
  mode: string
  detail: string
  value: string
  extra?: string
}

export interface ProposalContent {
  portada: {
    title: string
    subtitle: string
    topic: string
    brand: string
    email: string
    date: string
  }
  descripcion: {
    title: string
    text: string
    metrics: ProgramMetric[]
  }
  contenido: {
    title: string
    sesiones: SessionBlock[]
  }
  inversion: {
    title: string
    tableHead: {
      mode: string
      value: string
    }
    opciones: PaymentOption[]
  }
  incluye: {
    title: string
    items: string[]
  }
  proximosPasos: {
    title: string
    steps: Array<{
      id: string
      text: string
    }>
  }
  cierre: {
    signature: string
    tagline: string
  }
}

export const proposalContent: ProposalContent = {
  portada: {
    title: 'PROPUESTA COMERCIAL',
    subtitle: 'Taller Presencial',
    topic: 'Generación de Video con IA',
    brand: 'Vena Digital',
    email: 'laura@venadigital.com.co',
    date: 'Marzo 2025',
  },
  descripcion: {
    title: 'Descripción del programa',
    text: 'Un taller práctico de 6 sesiones presenciales diseñado para que domines el flujo completo de creación de video con inteligencia artificial: desde entender las herramientas hasta tener piezas terminadas y publicables.',
    metrics: [
      {
        value: '6',
        label: 'Sesiones presenciales',
      },
      {
        value: '3 hrs',
        label: 'Por sesión',
      },
      {
        value: '100%',
        label: 'Práctica aplicada',
      },
    ],
  },
  contenido: {
    title: 'Contenido del programa',
    sesiones: [
      {
        title: 'Sesión 1  Fundamentos + Ecosistema de herramientas',
        objective: 'Objetivo: Que entiendas qué se puede hacer hoy con video IA y qué no.',
        bullets: [
          '› Cómo funciona la IA generativa de video y sus limitaciones actuales',
          '› Panorama general de herramientas disponibles',
          '› Cuál usar según el objetivo: reel vs. producto vs. anuncio',
          '› Diferencias entre generación desde texto, imagen y video — cuándo usar cada flujo',
          '› Tarea práctica para la siguiente sesión',
        ],
      },
      {
        title: 'Sesión 2  Prompting para video',
        objective:
          "Objetivo: Que dejes de escribir prompts flojos tipo 'hazme un video para…'.",
        bullets: [
          '› Anatomía de un buen prompt de video',
          '› Prompt por escenas vs. prompt libre',
          '› Planos, encuadres, ángulos, focos y estilos visuales',
          '› Errores comunes y cómo evitarlos',
          '› Iterar y corregir hasta obtener el resultado deseado',
          '› Práctica en vivo',
          '› Tarea práctica para la siguiente sesión',
        ],
      },
      {
        title: 'Sesión 3  Generación de video avanzada',
        objective: 'Objetivo: Producir piezas reales con control y criterio.',
        bullets: [
          '› Generación text-to-video',
          '› Generación image-to-video',
          '› Generación video-to-video',
          '› Consistencia visual entre clips',
          '› Control de movimiento y dirección visual',
          '› Práctica en vivo',
          '› Tarea práctica para la siguiente sesión',
        ],
      },
      {
        title: 'Sesión 4  Montaje y edición',
        objective: 'Objetivo: Convertir clips sueltos en una pieza usable y publicable.',
        bullets: [
          '› Selección de tomas',
          '› Limpieza de errores de generación',
          '› Ritmo, duración y orden narrativo',
          '› Edición en CapCut, Premiere o la herramienta más adecuada al perfil',
          '› Práctica en vivo',
          '› Tarea',
        ],
      },
      {
        title: 'Sesión 5  Taller de generación guiada I',
        objective:
          'Objetivo: Aplicar todo lo aprendido con acompañamiento en tiempo real.',
        bullets: [
          '› Producción guiada: tú generas, yo superviso y corrijo en vivo',
          '› Resolución de dudas técnicas y de flujo de trabajo',
          '› Feedback personalizado sobre tu estilo y objetivos',
          '› Identificación de errores recurrentes y cómo eliminarlos',
        ],
      },
      {
        title: 'Sesión 6  Taller de generación guiada II + Cierre',
        objective: 'Objetivo: Terminar con una pieza real, lista para publicar.',
        bullets: [
          '› Producción final: sesión de trabajo 100% aplicado',
          '› Resolución de preguntas finales y casos específicos',
          '› Revisión y pulido del proyecto final en vivo',
          '› Feedback completo sobre el entregable terminado',
          '› Recomendaciones de flujo de trabajo para continuar solo/a',
        ],
      },
    ],
  },
  inversion: {
    title: 'Inversión',
    tableHead: {
      mode: 'Modalidad de pago',
      value: 'Valor',
    },
    opciones: [
      {
        mode: 'Pago en dos cuotas',
        detail: '50% al inicio · 50% al finalizar',
        value: '$1.800.000 COP',
      },
      {
        mode: '★  Pago anticipado 100%',
        detail: '10% de descuento — pago único antes de la primera sesión',
        value: '$1.620.000 COP',
        extra: 'Ahorro de $180.000',
      },
    ],
  },
  incluye: {
    title: 'Incluye:',
    items: [
      '• 6 sesiones presenciales de 3 horas cada una',
      '• Guías de referencia de herramientas y flujos de trabajo',
      '• Plantillas de prompts listos para usar',
      '• Tareas con feedback personalizado entre sesiones',
    ],
  },
  proximosPasos: {
    title: 'Próximos pasos',
    steps: [
      {
        id: '01',
        text: 'Confirmación del programa y fechas de sesiones',
      },
      {
        id: '02',
        text: 'Pago del 50% inicial (o 100% con descuento)',
      },
      {
        id: '03',
        text: 'Primera sesión presencial — ¡a producir!',
      },
    ],
  },
  cierre: {
    signature: 'Vena Digital  ·  laura@venadigital.com.co',
    tagline: 'IA y estrategia digital para emprendedores',
  },
}
