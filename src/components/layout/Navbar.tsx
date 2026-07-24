/** Renderiza la navegación principal y el menú móvil. */

import React, { useState } from 'react';
import { Menu, X, ArrowLeft, Globe, BookOpen, Moon, Sun } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { INSTITUTION, NAV_ITEMS } from '@/lib/config/constants';
import { useLandingData } from '@/features/landing';

interface NavbarProps {
  simplified?: boolean;
}

const getInitialIsDark = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return savedTheme === 'dark' || (!savedTheme && prefersDark);
};

const applyDarkClass = (isDark: boolean) => {
  document.documentElement.classList.toggle('dark', isDark);
};

const Navbar: React.FC<NavbarProps> = ({ simplified = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useLandingData();
  const content = data.content;

  const [isDark, setIsDark] = useState(() => {
    const initialIsDark = getInitialIsDark();
    applyDarkClass(initialIsDark);
    return initialIsDark;
  });
  const titleTextClass = isDark ? 'text-white' : 'text-[#00315f]';
  const subtitleTextClass = isDark ? 'text-zinc-300' : 'text-zinc-700';
  const navTextClass = isDark
    ? 'text-zinc-100 hover:text-ups-yellow'
    : 'text-[#00315f] hover:text-ups-blue-light';
  const mobileMenuClass = isDark
    ? 'bg-[#1a1a1a] border-zinc-700'
    : 'bg-white border-zinc-200';
  const mobileMenuItemClass = isDark
    ? 'border-zinc-700 text-zinc-100 hover:text-ups-yellow hover:bg-zinc-800'
    : 'border-zinc-100 text-[#00315f] hover:text-ups-blue-light hover:bg-zinc-50';

  const toggleDarkMode = () => {
    const newDark = !isDark;
    applyDarkClass(newDark);
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Los hashes dentro del home usan scroll suave; desde otras rutas navegan primero.
    if (href.includes('#')) {
      const [path, hash] = href.split('#');

      if (location.pathname === path || (location.pathname === '/' && path === '')) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      } else {
        navigate(href);
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header 
      className={`font-sans sticky top-0 z-50 w-full shadow-md border-b-4 border-ups-yellow transition-colors duration-300 ${
        isDark ? 'bg-[#1a1a1a]' : 'bg-white'
      }`} 
      style={{ WebkitTransform: 'translateZ(0)' }}
    >
      <div className="bg-ups-blue min-h-10 w-full flex items-center justify-between gap-2 px-3 py-2 sm:px-6 lg:px-8 text-white">
        {!simplified && (
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white/10 px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wider leading-none transition-colors hover:bg-white/15 hover:text-ups-yellow sm:px-3 sm:gap-2 sm:text-[11px] group"
            title={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <Sun size={14} className="group-hover:rotate-90 transition-transform duration-300" /> : <Moon size={14} className="group-hover:-rotate-12 transition-transform duration-300" />}
            <span className="hidden whitespace-nowrap sm:inline">{isDark ? 'Light Mode' : 'Dark mode'}</span>
          </button>
        )}
        {!simplified && (
          <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-4 lg:gap-8">
            <a
              href={content.links.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-8 items-center gap-1.5 rounded-full px-2 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:bg-white/10 hover:text-ups-yellow sm:gap-2 sm:px-3 sm:text-[11px]"
            >
              <Globe size={14} />
              <span className="hidden whitespace-nowrap sm:inline">Portal UPS</span>
            </a>

            <a
              href={content.links.avac}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-8 items-center gap-1.5 rounded-full px-2 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:bg-white/10 hover:text-ups-yellow sm:gap-2 sm:px-3 sm:text-[11px]"
            >
              <BookOpen size={14} />
              <span className="hidden whitespace-nowrap sm:inline">AVAC</span>
            </a>

          </div>
        )}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 cursor-pointer focus:outline-none"
          >
            <img
              src="/logoupscolor.svg"
              alt={INSTITUTION.NAME}
              className="h-9 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[90px] sm:max-w-[180px] lg:max-w-[260px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://posgrados.ups.edu.ec/wp-content/uploads/2021/04/logo-ups.png";
              }}
            />
          </Link>
          <div className={`ml-2 pl-2 sm:ml-3 sm:pl-3 border-l-2 flex flex-col justify-center ${isDark ? 'border-zinc-700' : 'border-zinc-300'}`}>
            <h1 className={`${titleTextClass} font-bold uppercase tracking-wide leading-tight text-[9px] sm:text-xs lg:text-sm whitespace-nowrap`}>
              {content.career}
            </h1>
            <span className={`${subtitleTextClass} font-semibold text-[8px] sm:text-[10px] lg:text-xs mt-0.5 whitespace-nowrap`}>{content.sede}</span>
          </div>
        </div>

        {!simplified && (
          <nav className="hidden xl:flex items-center justify-center flex-1 ml-20 gap-9">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-extrabold uppercase transition-colors relative group ${navTextClass}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-ups-yellow transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        )}

        {!simplified && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            className={`xl:hidden focus:outline-none p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${navTextClass}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {simplified && (
          <Link
            to="/"
            className={`flex items-center gap-2 sm:gap-3 transition-colors font-extrabold text-xs sm:text-sm uppercase tracking-tighter group ${navTextClass}`}
            title="Volver al Inicio"
          >
            <div className="size-9 sm:size-10 bg-ups-blue text-white flex items-center justify-center rounded-full shadow-md group-hover:bg-ups-yellow group-hover:text-ups-blue group-hover:rotate-[-360deg] transition-all duration-500">
              <ArrowLeft size={18} />
            </div>
            <span className="hidden sm:inline">Volver al Inicio</span>
          </Link>
        )}
      </div>

      {isOpen && (
        <div className={`xl:hidden border-t absolute w-full shadow-lg z-40 ${mobileMenuClass}`}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-3.5 border-b text-base font-bold uppercase transition-colors min-h-[44px] flex items-center ${mobileMenuItemClass}`}
              >
                {item.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
