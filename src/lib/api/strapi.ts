/** Define utilidades y tipos reutilizables para respuestas de Strapi. */

export interface StrapiEntityBase {
  id: number;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMedia extends StrapiEntityBase {
  url?: string;
  alternativeText?: string | null;
  name?: string;
  mime?: string;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type StrapiCreatePayload<T> = {
  data: T;
};

type StrapiAttributes<T> = T & {
  attributes?: T;
  data?: unknown;
};

type StrapiMediaLike = {
  url?: string;
  attributes?: StrapiMediaLike;
  data?: StrapiMediaLike | StrapiMediaLike[] | null;
};

function withQuery(endpoint: string, params: Record<string, string | number | boolean | string[]>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => query.append(`${key}`, String(v)));
    } else {
      query.set(key, String(value));
    }
  });

  return `${endpoint}?${query.toString()}`;
}

export function withPopulate(endpoint: string, populate: string | string[]): string {
  return withQuery(endpoint, { populate });
}

export function withSort(endpoint: string, sort: string, extraParams: Record<string, string | number | boolean | string[]> = {}): string {
  return withQuery(endpoint, { ...extraParams, sort });
}

function strapiUrl(apiBaseUrl: string): string {
  return apiBaseUrl.replace(/\/api\/?$/, '');
}

export function strapiMediaUrl(apiBaseUrl: string, url?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;

  return `${strapiUrl(apiBaseUrl)}${url}`;
}

export function strapiData<T>(item: StrapiAttributes<T> | null | undefined): T {
  if (!item) return {} as T;
  return (item.attributes ?? item) as T;
}

export function strapiMediaPath(media: StrapiMediaLike | null | undefined): string | undefined {
  if (!media) return undefined;

  if (typeof media.url === 'string') return media.url;
  if (media.attributes) return strapiMediaPath(media.attributes);

  if (Array.isArray(media.data)) {
    return strapiMediaPath(media.data[0]);
  }

  return strapiMediaPath(media.data as StrapiMediaLike | null | undefined);
}
