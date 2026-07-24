/** Normaliza variables de entorno usadas por la aplicación. */

const DEFAULT_API_BASE_URL = import.meta.env.DEV ? 'http://localhost:1337/api' : '/api';

function isLocalUrl(value: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(value);
}

function normalizeApiBaseUrl(value?: string): string {
  const rawValue = value?.trim();
  const apiBaseUrl = rawValue && !(import.meta.env.PROD && isLocalUrl(rawValue))
    ? rawValue
    : DEFAULT_API_BASE_URL;
  const withoutTrailingSlash = apiBaseUrl.replace(/\/+$/, '');

  if (withoutTrailingSlash === '') {
    return DEFAULT_API_BASE_URL;
  }

  if (/\/api$/i.test(withoutTrailingSlash)) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/api`;
}

export const env = {
  API_BASE_URL: normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
} as const;
