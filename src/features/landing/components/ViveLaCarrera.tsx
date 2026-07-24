/** Renderiza el carrusel de publicaciones de la carrera. */

import React from 'react';
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import type { Publication } from '@/features/landing/types/landing.types';
import { getLoopedItems, useCarouselControls } from '../hooks/useCarouselControls';

const ViveLaCarrera: React.FC = () => {
  const { data } = useLandingData();
  const publications = data.publications as Publication[];
  const { scrollRef, scroll, loopOffset } = useCarouselControls<HTMLDivElement>(publications.length);
  const loopedPublications = getLoopedItems(publications, loopOffset);
  const sectionContent = data.content.viveCarrera;
  const shouldCenterCards = publications.length <= 3;

  return (
    <section id="noticias" className="py-14 sm:py-20 bg-zinc-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            {sectionContent.title}
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          {sectionContent.description && (
            <p className="mt-4 max-w-2xl text-center text-zinc-600 text-sm sm:text-base whitespace-pre-line">
              {sectionContent.description}
            </p>
          )}
        </div>

        <div className="relative mx-auto w-full" style={{ minWidth: '96px', maxWidth: publications.length > 0 ? `min(100%, ${publications.length * 350 + (publications.length - 1) * 24 + 112}px)` : '0px' }}>
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto snap-x snap-mandatory gap-6 px-10 sm:px-14 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-md:w-[calc(100vw-6rem)] max-md:max-w-[350px] max-md:mx-auto max-md:px-0 ${shouldCenterCards ? 'xl:justify-center' : 'justify-start'
              }`}
          >
            {loopedPublications.map((pub: Publication) => (
              <div data-carousel-id={String(pub.id)} key={pub.id} className="snap-center shrink-0 w-[calc(100vw-6rem)] max-w-[350px] sm:w-[310px] lg:w-[350px] bg-white rounded-none border border-black shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="relative h-60 sm:h-72 overflow-hidden bg-zinc-100">
                  <img
                    src={pub.image}
                    alt={pub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-ups-yellow text-ups-blue text-[10px] font-bold px-4 py-2 uppercase shadow-sm">
                    {pub.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg sm:text-xl text-ups-blue mb-3 leading-tight group-hover:text-ups-yellow transition-colors line-clamp-2 min-h-[3.5rem]">
                    {pub.title}
                  </h3>
                  <p className="text-zinc-600 text-sm mb-6 line-clamp-3">
                    {pub.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-ups-blue/60 uppercase tracking-wider">{pub.date}</span>
                    {pub.url && pub.url !== '#' && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-ups-blue text-white font-bold text-[11px] uppercase hover:bg-ups-yellow hover:text-ups-blue transition-all shadow-sm"
                      >
                        Leer más <ChevronRight size={14} />
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

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.ups.edu.ec/noticias"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-ups-blue text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-ups-yellow hover:text-ups-blue transition-all shadow-md text-center"
          >
            Ver noticias en el portal <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ViveLaCarrera;
