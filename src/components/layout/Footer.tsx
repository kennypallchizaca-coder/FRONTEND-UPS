/** Renderiza el pie de página institucional. */

import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { INSTITUTION } from '@/lib/config/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ups-blue text-white/90 py-12 sm:py-16 border-t-4 border-ups-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-4">{INSTITUTION.NAME}</h3>
            <p className="text-sm mb-2">{INSTITUTION.SEDE}</p>
            <p className="text-sm font-semibold text-white">{INSTITUTION.CAREER}</p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-ups-yellow transition-colors">Inicio</a></li>
              <li><a href="/#noticias" className="hover:text-ups-yellow transition-colors">Publicaciones</a></li>
              <li><a href="/#casos-exito" className="hover:text-ups-yellow transition-colors">Casos de éxito</a></li>
              <li><a href="/#grupos-asu" className="hover:text-ups-yellow transition-colors">Grupos ASU</a></li>
              <li><a href="/#vinculacion" className="hover:text-ups-yellow transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-ups-yellow shrink-0 mt-0.5" />
                <span>Calle Vieja 12-30 y Elia Liut.<br />Cuenca - Ecuador</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-ups-yellow shrink-0" />
                <span>(+593) 7 413 5250</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-ups-yellow shrink-0" />
                <a href="mailto:computacion@ups.edu.ec" className="break-all hover:text-ups-yellow transition-colors">computacion@ups.edu.ec</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
            <div className="flex gap-x-4">
              <a href={INSTITUTION.FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Ir a Facebook" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" /></svg>
              </a>
              <a href={INSTITUTION.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Ir a Instagram" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.21-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
              </a>
              <a href={INSTITUTION.TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Ir a TikTok" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.35-2.86 5.68-1.72 1.35-4.04 1.83-6.14 1.34-2.11-.49-3.95-1.93-4.88-3.86-.94-1.92-1.02-4.28-.19-6.25.82-1.96 2.5-3.5 4.47-4.14 1.98-.65 4.2-.5 6.06.39v4.11c-1.09-.59-2.42-.76-3.62-.43-1.2.33-2.18 1.25-2.6 2.4-.41 1.16-.27 2.49.38 3.53.64 1.05 1.86 1.72 3.08 1.82 1.23.09 2.49-.24 3.39-1.05.91-.82 1.4-2.04 1.42-3.29.02-4.85.01-9.7.02-14.55z" /></svg>
              </a>
              <a href={INSTITUTION.X_URL} target="_blank" rel="noopener noreferrer" aria-label="Ir a X (Twitter)" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" /></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 text-sm text-center">
          <p>&copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Universidad Politécnica Salesiana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
