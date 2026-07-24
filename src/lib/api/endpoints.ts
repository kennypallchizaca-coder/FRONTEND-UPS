/** Centraliza las rutas de API usadas por el frontend. */

export const ENDPOINTS = {
  ADMISIONES: {
    CREATE: '/leads/submit',
  },

  VINCULACION: {
    CREATE: '/company-requests',
  },

  PUBLICACIONES: {
    LIST: '/publications',
  },

  RESEARCH_GROUPS: {
    LIST: '/research-groups',
  },

  LANDING: {
    CONTENT: '/landing-content',
    HERO_SLIDES: '/hero-slides',
    ASU_GROUPS: '/asu-groups',
    ALLIANCES: '/alliances',
    COMPANIES: '/companies',
    SUCCESS_CASES: '/success-cases',
  },
} as const;
