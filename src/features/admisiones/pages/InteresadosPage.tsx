/** Renderiza la página de solicitud de información para interesados. */

import { useEffect } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { SolicitudInformacion } from '@/features/admisiones';
import { SeoHead } from '@/components/common';

const InteresadosPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans text-zinc-800 flex flex-col min-h-screen overflow-x-hidden w-full relative bg-zinc-50">
      <SeoHead title="Solicita Información" description="Regístrate y recibe información sobre admisión, malla curricular, becas y laboratorios de la Carrera de Computación UPS." />
      <Navbar simplified />

      <main className="flex-grow">
        <SolicitudInformacion className="pt-10 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 bg-zinc-50" />
      </main>

      <Footer />
    </div>
  );
};

export default InteresadosPage;
