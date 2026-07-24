/** Renderiza la sección de alianzas académicas. */

import React from 'react';
import { useLandingData } from '@/features/landing';

const Alianzas: React.FC = () => {
  const { data } = useLandingData();
  const alliances = data.alliances;
  const sectionContent = data.content.alianzas;

  return (
    <section id="alianzas" className="py-14 sm:py-16 md:py-20 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            {sectionContent.title}
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          {sectionContent.description && (
            <p className="mt-4 max-w-2xl text-center text-zinc-600 text-sm sm:text-base whitespace-pre-line">
              {sectionContent.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-20">
          {alliances.map((alianza) => {
            const Content = (
              <div
                className="group p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                title={alianza.name}
              >
                <img
                  src={alianza.logo}
                  alt={`Logo de ${alianza.name}`}
                  className="h-10 md:h-14 object-contain"
                />
              </div>
            );

            return alianza.buttonLink ? (
              <a key={alianza.id} href={alianza.buttonLink} target="_blank" rel="noopener noreferrer">
                {Content}
              </a>
            ) : (
              <div key={alianza.id}>{Content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Alianzas;
