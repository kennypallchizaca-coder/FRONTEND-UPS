/** Renderiza enlaces sociales provenientes de Strapi. */

import { Globe } from 'lucide-react';

interface SocialLinksProps {
  links?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
    web?: string;
  };
  className?: string;
}

const SocialIcons = {
  facebook: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" />
    </svg>
  ),
  instagram: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.21-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
  ),
  tiktok: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.35-2.86 5.68-1.72 1.35-4.04 1.83-6.14 1.34-2.11-.49-3.95-1.93-4.88-3.86-.94-1.92-1.02-4.28-.19-6.25.82-1.96 2.5-3.5 4.47-4.14 1.98-.65 4.2-.5 6.06.39v4.11c-1.09-.59-2.42-.76-3.62-.43-1.2.33-2.18 1.25-2.6 2.4-.41 1.16-.27 2.49.38 3.53.64 1.05 1.86 1.72 3.08 1.82 1.23.09 2.49-.24 3.39-1.05.91-.82 1.4-2.04 1.42-3.29.02-4.85.01-9.7.02-14.55z" />
    </svg>
  ),
  x: ({ size = 17 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  youtube: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  web: ({ size = 18 }: { size?: number }) => <Globe size={size} aria-hidden="true" />,
};

const PLATFORMS = ['facebook', 'instagram', 'tiktok', 'x', 'youtube', 'web'] as const;

const PLATFORM_HOVER_COLORS: Record<(typeof PLATFORMS)[number], string> = {
  facebook: 'hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-[#1877F2]/35',
  instagram: 'hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:shadow-[#E4405F]/35',
  tiktok: 'hover:border-black hover:bg-black hover:text-white hover:shadow-cyan-400/35',
  x: 'hover:border-black hover:bg-black hover:text-white hover:shadow-black/30',
  youtube: 'hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:shadow-[#FF0000]/35',
  web: 'hover:border-ups-blue hover:bg-ups-blue hover:text-white hover:shadow-ups-blue/30',
};

const PLATFORM_LABELS: Record<(typeof PLATFORMS)[number], string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  x: 'X',
  youtube: 'YouTube',
  web: 'Sitio web',
};

function hasSocialLinks(links?: SocialLinksProps['links']) {
  return Boolean(links && PLATFORMS.some((platform) => links[platform]));
}

export function SocialLinks({ links, className = '' }: SocialLinksProps) {
  if (!hasSocialLinks(links)) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {PLATFORMS.map((platform) => {
        const url = links?.[platform];
        if (!url) return null;

        const Icon = SocialIcons[platform];

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-ups-blue shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ups-yellow focus-visible:ring-offset-2 ${PLATFORM_HOVER_COLORS[platform]}`}
            title={PLATFORM_LABELS[platform]}
            aria-label={PLATFORM_LABELS[platform]}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
