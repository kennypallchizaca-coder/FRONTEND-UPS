/** Renderiza la página 404 para rutas no encontradas. */

import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Navbar, Footer } from '@/components/layout';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-20">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-semibold text-[#003B71] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4 uppercase tracking-tight">
            Página no encontrada
          </h2>
          <p className="text-zinc-600 mb-10 leading-relaxed">
            La página que buscas no existe o ha sido movida.
            Verifica la URL o regresa al inicio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#005BAA] text-white font-semibold uppercase text-xs tracking-widest hover:bg-[#004a88] transition-colors shadow-md"
            >
              <Home size={16} />
              Ir al inicio
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#005BAA] border border-zinc-200 font-semibold uppercase text-xs tracking-widest hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <ArrowLeft size={16} />
              Volver atrás
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
