'use client';

import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 576) return 'xs';               // Teléfonos pequeños
  if (width >= 576 && width < 768) return 'sm'; // Teléfonos
  if (width >= 768 && width < 992) return 'md'; // Tablets
  if (width >= 992 && width < 1200) return 'lg'; // Laptops
  return 'xl';                                // Escritorios grandes
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs'); // valor inicial seguro

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    // Ejecutar inmediatamente en cliente
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

