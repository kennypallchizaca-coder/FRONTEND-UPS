/** Utilidades pequeñas para limpiar texto enviado a la API. */

const HTML_TAGS = /<[^>]*>/g;

function stripControlChars(value: string): string {
  return Array.from(value)
    .map((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : char;
    })
    .join('');
}

export function sanitizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';

  return stripControlChars(value)
    .replace(HTML_TAGS, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(value: unknown): string {
  return sanitizeText(value, 254).toLowerCase();
}

export function sanitizePhone(value: unknown): string {
  return sanitizeText(value, 20).replace(/[^\d+()\-\s]/g, '');
}
