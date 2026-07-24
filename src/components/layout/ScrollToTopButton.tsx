/** Muestra un botón flotante para volver al inicio de la página. */

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-ups-yellow text-ups-blue shadow-lg hover:bg-ups-blue hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none"
          style={{ bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 0.5rem))' }}
          aria-label="Ir al inicio"
        >
          <ChevronUp size={24} className="stroke-[3px]" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
