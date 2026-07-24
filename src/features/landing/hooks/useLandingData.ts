/** Carga, normaliza y cachea el contenido dinámico de la landing. */
import { useState, useEffect } from 'react';
import { env } from '@/lib/config/env';
import { landingService } from '../services/landing.service';
import { strapiData, strapiMediaPath, strapiMediaUrl } from '@/lib/api';
import type { LandingState } from '../types/landing.types';
import type { LandingRemoteItem } from '../services/landing.service';

const INITIAL_DATA: LandingState['data'] = {
  heroSlides: [],
  researchGroups: [],
  asuGroups: [],
  alliances: [],
  companies: [],
  successCases: [],
  publications: [],
  content: {
    career: 'Computación',
    sede: 'Sede Cuenca',
    social: {},
    links: {
      portal: 'https://www.ups.edu.ec/',
      avac: 'https://avac.ups.edu.ec/',
    },
    contact: {
      email: 'computacion@ups.edu.ec',
      phone: '(+593) 7 413 5250',
      address: 'Calle Vieja 12-30 y Elia Liut.<br />Cuenca - Ecuador',
    },
    hero: { title: 'Carrera de Computación', active: true },
    viveCarrera: { title: 'Vive la carrera', active: true },
    gruposInvestigacion: { title: 'Grupos de Investigación', active: true },
    gruposAsu: { title: 'Agrupaciones ASU', active: true },
    alianzas: { title: 'Alianzas Estratégicas', active: true },
    empresas: { title: 'Empresas que confían en nosotros', active: true },
    casosExito: { title: 'Casos de éxito', description: 'Historias reales de estudiantes, graduados y proyectos que demuestran el impacto de la carrera.', active: true },
  },
};

const CACHE_KEY = 'ups_landing_cache_v9';

// Caché en memoria
let globalCache: LandingState['data'] | null = null;
let hasStartedRemoteLoad = false;
const landingSubscribers = new Set<(state: LandingState) => void>();

type RawLandingItem = LandingRemoteItem & {
  [key: string]: unknown;
  attributes?: RawLandingItem;
  createdAt?: string;
  activo?: boolean;
  categoria?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  x?: string;
  twitter?: string;
  youtube?: string;
  url?: string;
};

type RawSection = {
  titulo?: string;
  descripcion?: string;
  activo?: boolean;
};

type RawLandingContent = RawLandingItem & {
  carrera?: string;
  sede?: string;
  portal_url?: string;
  avac_url?: string;
  email_contacto?: string;
  telefono_contacto?: string;
  direccion_contacto?: string;
  seccion_hero?: RawSection;
  seccion_vive_carrera?: RawSection;
  seccion_grupos_investigacion?: RawSection;
  seccion_grupos_asu?: RawSection;
  seccion_alianzas?: RawSection;
  seccion_empresas?: RawSection;
  seccion_casos_exito?: RawSection;
};

type RemoteResponse = { data?: LandingRemoteItem[] | LandingRemoteItem } | LandingRemoteItem[];

function collectionData(response: RemoteResponse | null | undefined): RawLandingItem[] {
  if (Array.isArray(response)) return response as RawLandingItem[];
  if (Array.isArray(response?.data)) return response.data as RawLandingItem[];
  return [];
}

function isActive(item?: { activo?: boolean } | null): boolean {
  return item?.activo !== false;
}

function activeCollectionData(response: RemoteResponse | null | undefined): RawLandingItem[] {
  return collectionData(response).filter((item) => isActive(strapiData<RawLandingItem>(item)));
}

function inactiveLandingContent(): LandingState['data']['content'] {
  return {
    ...INITIAL_DATA.content,
    hero: { ...INITIAL_DATA.content.hero, active: false },
    viveCarrera: { ...INITIAL_DATA.content.viveCarrera, active: false },
    gruposInvestigacion: { ...INITIAL_DATA.content.gruposInvestigacion, active: false },
    gruposAsu: { ...INITIAL_DATA.content.gruposAsu, active: false },
    alianzas: { ...INITIAL_DATA.content.alianzas, active: false },
    empresas: { ...INITIAL_DATA.content.empresas, active: false },
    casosExito: { ...INITIAL_DATA.content.casosExito, active: false },
  };
}

function absoluteMediaUrl(apiBaseUrl: string, media: unknown): string {
  return strapiMediaUrl(apiBaseUrl, strapiMediaPath(media as Parameters<typeof strapiMediaPath>[0])) ?? '';
}

function plainText(value: unknown): string {
  if (typeof value === 'string') return value.trim();

  if (Array.isArray(value)) {
    return value
      .flatMap((item) => {
        const text = plainText(item);
        return text ? [text] : [];
      })
      .join('\n')
      .trim();
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if (typeof record.text === 'string') return record.text;
    if (Array.isArray(record.children)) return plainText(record.children);
    if (typeof record.value === 'string') return record.value;
  }

  return '';
}

function saveLandingCache(data: LandingState['data']) {
  globalCache = data;
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

function publishLandingState(data: LandingState['data'], isLoading: boolean) {
  landingSubscribers.forEach((listener) => listener({ data, isLoading }));
}

export const useLandingData = () => {
  const [state, setState] = useState<LandingState>(() => {
    if (globalCache) return { data: globalCache, isLoading: false };

    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        globalCache = parsed;
        return { data: parsed, isLoading: false };
      }
    } catch {
      localStorage.removeItem(CACHE_KEY);
    }

    return { data: INITIAL_DATA, isLoading: true };
  });

  useEffect(() => {
    let isMounted = true;
    const apiBaseUrl = env.API_BASE_URL;

    const listener = (nextState: LandingState) => {
      if (isMounted) setState(nextState);
    };

    landingSubscribers.add(listener);

    const patchSection = <K extends keyof LandingState['data']>(
      key: K,
      value: LandingState['data'][K]
    ) => {
      const nextData = {
        ...(globalCache ?? INITIAL_DATA),
        [key]: value,
      };

      saveLandingCache(nextData);
      publishLandingState(nextData, false);
    };

    const loadSection = async <K extends keyof LandingState['data']>(
      key: K,
      request: () => Promise<RemoteResponse>,
      map: (response: RemoteResponse) => LandingState['data'][K]
    ) => {
      try {
        const response = await request();
        patchSection(key, map(response));
      } catch {
        // Conserva la última versión en caché si una sección remota falla.
      }
    };

    if (!hasStartedRemoteLoad) {
      hasStartedRemoteLoad = true;

      const sectionLoads = [
        loadSection('heroSlides', landingService.getHeroSlides, (heroSlidesResponse) => activeCollectionData(heroSlidesResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            src: absoluteMediaUrl(apiBaseUrl, attr.imagen),
            alt: attr.titulo || 'UPS',
          };
        })),

        loadSection('researchGroups', landingService.getResearchGroups, (researchGroupsResponse) => activeCollectionData(researchGroupsResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            id: item.documentId || item.id || 0,
            title: attr.nombre || '',
            category: attr.categoria,
            description: plainText(attr.descripcion),
            image: absoluteMediaUrl(apiBaseUrl, attr.imagen),
            icon: attr.icono,
            buttonText: attr.texto_boton,
            buttonLink: attr.enlace_boton,
            socialLinks: {
              facebook: attr.facebook_url,
              instagram: attr.instagram_url,
              tiktok: attr.tiktok_url,
              x: attr.x_url,
              youtube: attr.youtube_url,
              web: attr.web_url,
            }
          };
        })),

        loadSection('asuGroups', landingService.getAsuGroups, (asuGroupsResponse) => activeCollectionData(asuGroupsResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            id: item.documentId || item.id || 0,
            title: attr.nombre || '',
            category: attr.categoria,
            description: plainText(attr.descripcion),
            image: absoluteMediaUrl(apiBaseUrl, attr.imagen),
            icon: attr.icono,
            buttonText: attr.texto_boton,
            buttonLink: attr.enlace_boton,
            socialLinks: {
              facebook: attr.facebook_url,
              instagram: attr.instagram_url,
              tiktok: attr.tiktok_url,
              x: attr.x_url,
              youtube: attr.youtube_url,
              web: attr.web_url,
            }
          };
        })),

        loadSection('alliances', landingService.getAlliances, (alliancesResponse) => activeCollectionData(alliancesResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            id: item.id || 0,
            name: attr.nombre || '',
            logo: absoluteMediaUrl(apiBaseUrl, attr.logo),
            buttonText: attr.texto_boton || '',
            buttonLink: attr.enlace_boton || '',
          };
        })),

        loadSection('companies', landingService.getCompanies, (companiesResponse) => activeCollectionData(companiesResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            name: attr.nombre || '',
            image: absoluteMediaUrl(apiBaseUrl, attr.logo || attr.imagen),
            icon: attr.icono,
            buttonText: attr.texto_boton || '',
            buttonLink: attr.enlace_boton || attr.url || '',
          };
        })),

        loadSection('successCases', landingService.getSuccessCases, (successCasesResponse) => activeCollectionData(successCasesResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            id: item.documentId || item.id || 0,
            title: attr.titulo || '',
            category: attr.categoria,
            name: attr.nombre || '',
            role: attr.cargo || '',
            company: attr.empresa || '',
            description: plainText(attr.descripcion),
            image: absoluteMediaUrl(apiBaseUrl, attr.imagen),
            icon: attr.icono,
            buttonText: attr.texto_boton || '',
            buttonLink: attr.enlace_boton || '',
            socialLinks: {
              facebook: attr.facebook_url,
              instagram: attr.instagram_url,
              tiktok: attr.tiktok_url,
              x: attr.x_url,
              youtube: attr.youtube_url,
              web: attr.web_url,
            }
          };
        })),

        loadSection('publications', landingService.getPublications, (publicationsResponse) => activeCollectionData(publicationsResponse).map((item) => {
          const attr = strapiData<RawLandingItem>(item);
          return {
            id: item.documentId || item.id || 0,
            title: attr.titulo || '',
            description: attr.descripcion || '',
            date: new Date(attr.createdAt || Date.now()).toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' }),
            image: absoluteMediaUrl(apiBaseUrl, attr.imagen),
            category: attr.categoria || 'Noticia',
            icon: attr.icono,
            url: attr.enlace_boton || '#',
          };
        })),

        loadSection('content', landingService.getLandingContent, (contentResponse) => {
          const item = (contentResponse as { data?: LandingRemoteItem }).data;
          const attr = strapiData<RawLandingContent>(item as RawLandingContent);

          if (!isActive(attr)) return inactiveLandingContent();

          const mapSection = (section: RawSection | undefined, defaultTitle: string) => ({
            title: section?.titulo || defaultTitle,
            description: plainText(section?.descripcion),
            active: isActive(section),
          });

          return {
            career: attr?.carrera || 'Computación',
            sede: attr?.sede || 'Sede Cuenca',
            social: {
              facebook: attr?.facebook_url,
              instagram: attr?.instagram_url,
              tiktok: attr?.tiktok_url,
              x: attr?.x_url,
              youtube: attr?.youtube_url,
            },
            links: {
              portal: attr?.portal_url || 'https://www.ups.edu.ec/',
              avac: attr?.avac_url || 'https://avac.ups.edu.ec/',
            },
            contact: {
              email: attr?.email_contacto || 'computacion@ups.edu.ec',
              phone: attr?.telefono_contacto || '(+593) 7 413 5250',
              address: attr?.direccion_contacto || 'Calle Vieja 12-30 y Elia Liut.<br />Cuenca - Ecuador',
            },
            hero: mapSection(attr?.seccion_hero, 'Carrera de Computación'),
            viveCarrera: mapSection(attr?.seccion_vive_carrera, 'Vive la carrera'),
            gruposInvestigacion: mapSection(attr?.seccion_grupos_investigacion, 'Grupos de Investigación'),
            gruposAsu: mapSection(attr?.seccion_grupos_asu, 'Agrupaciones ASU'),
            alianzas: mapSection(attr?.seccion_alianzas, 'Alianzas Estratégicas'),
            empresas: mapSection(attr?.seccion_empresas, 'Empresas que confían en nosotros'),
            casosExito: mapSection(attr?.seccion_casos_exito, 'Casos de éxito'),
          };
        }),
      ];

      Promise.allSettled(sectionLoads).finally(() => {
        publishLandingState(globalCache ?? INITIAL_DATA, false);
      });
    }

    return () => {
      isMounted = false;
      landingSubscribers.delete(listener);
    };
  }, []);

  return state;
};
