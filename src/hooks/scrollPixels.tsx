import { useEffect, useState } from 'react';

export const useScrollPixels = () => {
  const [scrollPixels, setScrollPixels] = useState(0);

  useEffect(() => {
    const updateScrollPixels = () => {
      setScrollPixels(window.scrollY);
    };

    window.addEventListener('scroll', updateScrollPixels);

    updateScrollPixels();
  }, []);

  return scrollPixels;
};
