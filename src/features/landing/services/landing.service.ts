/** Consulta el contenido dinámico de la landing en la API. */

import { apiClient, ENDPOINTS, withPopulate, withSort } from '@/lib/api';
import type { StrapiCollectionResponse, StrapiMedia, StrapiSingleResponse } from '@/lib/api';

const PUBLIC_CONTENT_OPTIONS = {
  timeoutMs: 5_000,
};

/** Representa un item crudo tal como viene de Strapi v5 */
export interface LandingRemoteItem {
  id?: number;
  documentId?: string;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  imagen?: StrapiMedia;
  logo?: StrapiMedia;
  icono?: string;
  categoria?: string;
  activo?: boolean;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  x_url?: string;
  youtube_url?: string;
  web_url?: string;
  texto_boton?: string;
  enlace_boton?: string;
  cargo?: string;
  empresa?: string;
}

export const landingService = {
  getHeroSlides: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withPopulate(ENDPOINTS.LANDING.HERO_SLIDES, '*'),
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getResearchGroups: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.RESEARCH_GROUPS.LIST, 'orden:asc', { populate: '*' }),
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getAsuGroups: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.ASU_GROUPS, 'orden:asc', { populate: '*' }),
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getAlliances: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.ALLIANCES, 'orden:asc', { populate: '*' }),
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getCompanies: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.COMPANIES, 'orden:asc', { populate: '*' }),
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getLandingContent: async () => {
    const params = new URLSearchParams({
      'populate[seccion_vive_carrera]': '*',
      'populate[seccion_grupos_investigacion]': '*',
      'populate[seccion_grupos_asu]': '*',
      'populate[seccion_alianzas]': '*',
      'populate[seccion_empresas]': '*',
      'populate[seccion_casos_exito]': '*',
    });

    return apiClient.get<StrapiSingleResponse<LandingRemoteItem>>(
      `${ENDPOINTS.LANDING.CONTENT}?${params.toString()}`,
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getSuccessCases: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.SUCCESS_CASES, 'orden:asc', { populate: '*' }),
      PUBLIC_CONTENT_OPTIONS
    );
  },

  getPublications: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.PUBLICACIONES.LIST, 'createdAt:desc', { populate: '*' }),
      PUBLIC_CONTENT_OPTIONS
    );
  },
};
