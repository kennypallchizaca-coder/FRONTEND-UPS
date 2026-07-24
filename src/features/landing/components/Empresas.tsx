/** Renderiza el carrusel de empresas vinculadas. */

import React from 'react';
import { 
  Building2, 
  Briefcase, 
  ChevronLeft,
  ChevronRight,
  Factory,
  Globe,
  Landmark,
  Monitor,
  Truck,
  ShoppingCart,
  Hospital,
  GraduationCap
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import { getLoopedItems, useCarouselControls } from '../hooks/useCarouselControls';

const IconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={36} />,
  briefcase: <Briefcase size={36} />,
  factory: <Factory size={36} />,
  globe: <Globe size={36} />,
  landmark: <Landmark size={36} />,
  monitor: <Monitor size={36} />,
  truck: <Truck size={36} />,
  'shopping-cart': <ShoppingCart size={36} />,
  hospital: <Hospital size={36} />,
  'graduation-cap': <GraduationCap size={36} />,
};

const getIconForCompany = (iconName?: string) => {
  if (iconName && IconMap[iconName.toLowerCase()]) {
    return IconMap[iconName.toLowerCase()];
  }
  return <Building2 size={36} />;
};

const Empresas: React.FC = () => {
  const { data } = useLandingData();
  const companies = data.companies;
  const { scrollRef, scroll, loopOffset } = useCarouselControls<HTMLDivElement>(companies.length);
  const loopedCompanies = getLoopedItems(companies, loopOffset);
  const sectionContent = data.content.empresas;
  const shouldCenterCards = companies.length <= 4;

  return (
    <section id="empresas" className="relative py-16 sm:py-20 lg:py-24 bg-ups-blue text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
          alt="Oficina corporativa" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ups-blue/95 to-ups-blue/80 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-start gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-yellow mb-4 uppercase tracking-wide">
              {sectionContent.title}
            </h2>
            <div className="w-24 h-1 bg-ups-yellow mb-4 sm:mb-6"></div>
            {sectionContent.description && (
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                {sectionContent.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full" style={{ minWidth: '96px', maxWidth: companies.length > 0 ? `min(100%, ${companies.length * 260 + (companies.length - 1) * 24 + 112}px)` : '0px' }}>
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 px-10 sm:px-14 pb-4 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-md:w-[calc(100vw-6rem)] max-md:max-w-[260px] max-md:mx-auto max-md:px-0 ${
              shouldCenterCards ? 'xl:justify-center' : 'justify-start'
            }`}
          >
            {loopedCompanies.map((empresa) => {
              const CardContent = (
                <div className="relative w-full h-full rounded-none overflow-hidden group/card shadow-md">
                  {empresa.image ? (
                    <img src={empresa.image} alt={empresa.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                  <div className="absolute inset-0 bg-ups-blue/80 group-hover/card:bg-ups-blue/60 transition-colors duration-300 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ups-dark/90 via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                    <div className="text-ups-yellow mb-3 sm:mb-4 opacity-90 group-hover/card:-translate-y-2 transition-transform duration-300">
                      {getIconForCompany(empresa.icon)}
                    </div>
                    <span className="font-semibold text-base sm:text-lg tracking-wide text-white group-hover/card:-translate-y-1 transition-transform duration-300">{empresa.name}</span>
                  </div>
                </div>
              );

              return empresa.buttonLink ? (
                <a 
                  key={empresa.name} 
                  href={empresa.buttonLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  data-carousel-id={empresa.name}
                  className="relative snap-center shrink-0 w-[calc(100vw-6rem)] max-w-[260px] sm:w-[240px] lg:w-[260px] h-[220px] sm:h-[240px] lg:h-[260px] block border border-black"
                  title={empresa.buttonText || empresa.name}
                >
                  {CardContent}
                </a>
              ) : (
                <div 
                  data-carousel-id={empresa.name} 
                  key={empresa.name} 
                  className="relative snap-center shrink-0 w-[calc(100vw-6rem)] max-w-[260px] sm:w-[240px] lg:w-[260px] h-[220px] sm:h-[240px] lg:h-[260px] border border-black"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-ups-blue shadow-xl transition-all hover:bg-ups-yellow hover:text-ups-dark"
            title="Anterior"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-ups-blue shadow-xl transition-all hover:bg-ups-yellow hover:text-ups-dark"
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

export default Empresas;
