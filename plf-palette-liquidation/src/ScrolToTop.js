import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Composant à ajouter dans votre App
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;