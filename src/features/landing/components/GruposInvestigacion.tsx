/** Renderiza la sección de Grupos de Investigación sincronizada 100% con el Backend. */

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Microscope,
  Network,
  Database,
  Cpu,
  FlaskConical,
  Terminal,
  Search,
  Atom,
  Server,
  Zap,
  Activity
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import { SocialLinks } from './SocialLinks';
import { getLoopedItems, useCarouselControls } from '../hooks/useCarouselControls';

// Mapeo exacto basado en el Enum del Backend (research-group schema)
const IconMap: Record<string, React.ElementType<{ size?: number }>> = {
  microscope: Microscope,
  network: Network,
  database: Database,
  cpu: Cpu,
  flask: FlaskConical,
  terminal: Terminal,
  search: Search,
  atom: Atom,
  server: Server,
  zap: Zap,
  activity: Activity,
};

const getIcon = (iconName?: string, size = 48) => {
  const Icon = iconName ? IconMap[iconName.toLowerCase()] : undefined;
  return Icon ? <Icon size={size} /> : <Microscope size={size} />;
};

const HighlightedTitle = ({ title }: { title: string }) => {
  const words = title.trim().split(/\s+/);
  const lastWord = words.pop();
  if (!lastWord) return title;

  const prefix = words.join(' ');
  return (
    <>
      {prefix ? `${prefix} ` : ''}
      <span className="text-ups-yellow">{lastWord}</span>
    </>
  );
};

const GruposInvestigacion: React.FC = () => {
  const { data } = useLandingData();
  const researchGroups = data.researchGroups;
  const { scrollRef, scroll, loopOffset } = useCarouselControls<HTMLDivElement>(researchGroups.length);
  const loopedResearchGroups = getLoopedItems(researchGroups, loopOffset);
  const sectionContent = data.content.gruposInvestigacion;
  const shouldCenterCards = researchGroups.length <= 3;

  return (
    <section id="investigacion" className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            <HighlightedTitle title={sectionContent.title} />
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          {sectionContent.description && (
            <p className="mt-4 max-w-2xl text-center text-zinc-600 text-sm sm:text-base whitespace-pre-line">
              {sectionContent.description}
            </p>
          )}
        </div>

        <div className="relative mx-auto w-full" style={{ minWidth: '96px', maxWidth: researchGroups.length > 0 ? `min(100%, ${researchGroups.length * 350 + (researchGroups.length - 1) * 24 + 112}px)` : '0px' }}>
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto snap-x snap-mandatory gap-6 px-10 sm:px-14 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-md:w-[calc(100vw-6rem)] max-md:max-w-[350px] max-md:mx-auto max-md:px-0 ${
              shouldCenterCards ? 'xl:justify-center' : 'justify-start'
            }`}
          >
            {loopedResearchGroups.map((grupo) => (
              <div data-carousel-id={String(grupo.id)} key={grupo.id} className="snap-center shrink-0 w-[calc(100vw-6rem)] max-w-[350px] sm:w-[310px] lg:w-[350px] bg-white rounded-none border border-black shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="relative h-60 sm:h-72 overflow-hidden bg-zinc-100 flex items-center justify-center">
                  {/* Imagen real de Strapi o Icono si no hay imagen */}
                  {grupo.image && !grupo.image.includes('undefined') ? (
                    <img
                      src={grupo.image}
                      alt={grupo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-ups-blue group-hover:scale-110 transition-transform duration-500">
                      {getIcon(grupo.icon)}
                    </div>
                  )}

                  {grupo.category ? (
                    <div className="absolute top-0 left-0 bg-ups-yellow text-ups-blue text-[10px] font-bold px-4 py-2 uppercase shadow-sm">
                      {grupo.category}
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-ups-yellow text-ups-blue size-11 flex items-center justify-center shadow-sm" title={grupo.icon || 'investigacion'}>
                      {getIcon(grupo.icon, 22)}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg sm:text-xl text-ups-blue mb-3 leading-tight group-hover:text-ups-yellow transition-colors line-clamp-2 min-h-[3.5rem]">
                    {grupo.title}
                  </h3>
                  {grupo.description && (
                    <p className="text-left text-zinc-600 text-sm mb-6 line-clamp-3 whitespace-pre-line">
                      {grupo.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                    <SocialLinks links={grupo.socialLinks} />
                    {grupo.buttonLink && (
                      <a
                        href={grupo.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex w-fit items-center justify-center gap-2 px-4 py-2 bg-ups-blue text-white font-bold text-[11px] uppercase hover:bg-ups-yellow hover:text-ups-blue transition-all shadow-sm"
                      >
                        {grupo.buttonText || 'Ver líneas'} <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-[40%] -translate-y-1/2 z-20 flex size-9 sm:size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-ups-blue shadow-xl transition-all hover:bg-ups-yellow hover:text-ups-dark"
            title="Anterior"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-[40%] -translate-y-1/2 z-20 flex size-9 sm:size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-ups-blue shadow-xl transition-all hover:bg-ups-yellow hover:text-ups-dark"
            title="Siguiente"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GruposInvestigacion;
