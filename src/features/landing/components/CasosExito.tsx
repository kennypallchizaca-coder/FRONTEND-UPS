/** Renderiza la sección de casos de éxito conectada al Backend. */

import React from 'react';
import {
  Award,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Code,
  Cpu,
  GraduationCap,
  Rocket,
  Star,
  Target,
  Trophy,
  Users
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import { SocialLinks } from './SocialLinks';
import { getLoopedItems, useCarouselControls } from '../hooks/useCarouselControls';

// Mapeo exacto basado en el Enum del Backend (success-case schema)
const IconMap: Record<string, React.ElementType<{ size?: number }>> = {
  trophy: Trophy,
  star: Star,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  rocket: Rocket,
  award: Award,
  target: Target,
  building: Building2,
  code: Code,
  cpu: Cpu,
  users: Users,
};

const getIcon = (iconName?: string, size = 48) => {
  const Icon = iconName ? IconMap[iconName.toLowerCase()] : undefined;
  return Icon ? <Icon size={size} /> : <Trophy size={size} />;
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

const CasosExito: React.FC = () => {
  const { data } = useLandingData();
  const successCases = data.successCases;
  const { scrollRef, scroll, loopOffset } = useCarouselControls<HTMLDivElement>(successCases.length);
  const loopedSuccessCases = getLoopedItems(successCases, loopOffset);
  const sectionContent = data.content.casosExito;
  const shouldCenterCards = successCases.length <= 3;

  return (
    <section id="casos-exito" className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-100">
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

        <div className="relative mx-auto w-full" style={{ minWidth: '96px', maxWidth: successCases.length > 0 ? `min(100%, ${successCases.length * 350 + (successCases.length - 1) * 24 + 112}px)` : '0px' }}>
          <div
            ref={scrollRef}
            className={`flex min-h-14 overflow-x-auto snap-x snap-mandatory gap-6 px-10 sm:px-14 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-md:w-[calc(100vw-6rem)] max-md:max-w-[350px] max-md:mx-auto max-md:px-0 ${shouldCenterCards ? 'xl:justify-center' : 'justify-start'
              }`}
          >
            {loopedSuccessCases.map((caso) => (
              <article
                data-carousel-id={String(caso.id)}
                key={caso.id}
                className="snap-center shrink-0 w-[calc(100vw-6rem)] max-w-[350px] sm:w-[310px] lg:w-[350px] bg-white rounded-none border border-black shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-60 sm:h-72 overflow-hidden bg-zinc-100 flex items-center justify-center">
                  {/* Imagen real de Strapi o Icono si no hay imagen */}
                  {caso.image && !caso.image.includes('undefined') ? (
                    <img
                      src={caso.image}
                      alt={caso.name || caso.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-ups-blue group-hover:scale-110 transition-transform duration-500">
                      {getIcon(caso.icon)}
                    </div>
                  )}

                  {caso.category ? (
                    <div className="absolute top-0 left-0 bg-ups-yellow text-ups-blue text-[10px] font-bold px-4 py-2 uppercase shadow-sm">
                      {caso.category}
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-ups-yellow text-ups-blue size-11 flex items-center justify-center shadow-sm" title={caso.icon || 'caso de exito'}>
                      {getIcon(caso.icon, 22)}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg sm:text-xl text-ups-blue mb-3 leading-tight group-hover:text-ups-yellow transition-colors line-clamp-2 min-h-[3.5rem]">
                    {caso.title}
                  </h3>
                  {caso.description && (
                    <p className="text-left text-zinc-600 text-sm mb-4 line-clamp-3 whitespace-pre-line">
                      {caso.description}
                    </p>
                  )}
                  {(caso.name || caso.role || caso.company) && (
                    <div className="mb-5 text-left">
                      {caso.name && <p className="text-sm font-bold text-ups-blue">{caso.name}</p>}
                      {(caso.role || caso.company) && (
                        <p className="text-xs text-zinc-500 mt-1">
                          {[caso.role, caso.company].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                    <SocialLinks links={caso.socialLinks} />
                    {caso.buttonLink && (
                      <a
                        href={caso.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex w-fit items-center justify-center gap-2 px-4 py-2 bg-ups-blue text-white font-bold text-[11px] uppercase hover:bg-ups-yellow hover:text-ups-blue transition-all shadow-sm"
                      >
                        {caso.buttonText || 'Conocer más'} <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
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

export default CasosExito;