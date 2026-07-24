/** Actualiza metadatos SEO del documento desde componentes React. */

import { useEffect } from 'react';
import { INSTITUTION } from '@/lib/config/constants';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const DEFAULTS = {
  title: INSTITUTION.FULL_NAME,
  description:
    'Carrera de Computación de la Universidad Politécnica Salesiana, Sede Cuenca. Información sobre admisión, malla curricular, laboratorios, acreditación ABET y más.',
  image: '/seo-ups.png',
  type: 'website',
} as const;

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  type = DEFAULTS.type,
}) => {
  const fullTitle = title
    ? `${title} | ${INSTITUTION.CAREER} · UPS`
    : DEFAULTS.title;

  useEffect(() => {
    document.title = fullTitle;

    const upsertMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta('name', 'description', description);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:type', type);

    const canonicalUrl = window.location.origin + window.location.pathname;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }, [fullTitle, description, image, type]);

  return null;
};

export default SeoHead;
