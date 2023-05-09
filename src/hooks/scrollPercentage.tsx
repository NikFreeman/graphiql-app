import { useEffect, useState } from 'react';

export const useScrollPercentage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScrollPercentage = () => {
      setScrollPercentage(
        ((window.scrollY + window.innerHeight) / window.document.body.offsetHeight) * 100
      );
    };

    window.addEventListener('scroll', updateScrollPercentage);

    updateScrollPercentage();
  }, []);

  return scrollPercentage;
};
