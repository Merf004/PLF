import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ChevronUp } from 'lucide-react';

const Layout = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Gestion du bouton "retour en haut"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                <path d="M20 6h-2V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 4h8v2H8V4zm12 14H4V8h2v2h2V8h8v2h2V8h2v10z"/>
              </svg>
            </div>
            <div className="loading-text">
              <span className="loading-main">PLF</span>
              <span className="loading-sub">Palette Liquidation France</span>
            </div>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p className="loading-message">Chargement des meilleures offres...</p>
        </div>
        
        <style jsx>{`
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--primary-red) 0%, var(--dark-red) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeOut 0.5s ease 0.8s forwards;
          }

          .loading-content {
            text-align: center;
            color: white;
            animation: pulse 1.5s ease-in-out infinite alternate;
          }

          .loading-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .logo-icon {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            width: 80px;
            height: 80px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            animation: bounce 2s infinite;
          }

          .loading-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .loading-main {
            font-size: 3rem;
            font-weight: 800;
            color: white;
            line-height: 1;
            margin-bottom: 0.5rem;
            letter-spacing: 2px;
          }

          .loading-sub {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
          }

          .loading-spinner {
            margin: 2rem 0;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            margin: 0 auto;
            animation: spin 1s linear infinite;
          }

          .loading-message {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.1rem;
            font-weight: 500;
          }

          @keyframes fadeOut {
            to {
              opacity: 0;
              visibility: hidden;
            }
          }

          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translateY(0);
            }
            40%, 43% {
              transform: translateY(-10px);
            }
            70% {
              transform: translateY(-5px);
            }
            90% {
              transform: translateY(-2px);
            }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.05); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="layout">
      <Header />
      
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <Footer />

      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Particules d'animation de fond */}
      <div className="bg-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .main-content {
          flex: 1;
          margin-top: 80px; /* Hauteur du header fixe */
          position: relative;
        }

        .content-wrapper {
          min-height: calc(100vh - 80px - 200px); /* Hauteur écran - header - footer approximatif */
          animation: fadeIn 0.6s ease-out;
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: slideInUp 0.3s ease;
        }

        .scroll-top-btn:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 30px rgba(220, 38, 38, 0.5);
          background: linear-gradient(135deg, var(--dark-red), #991B1B);
        }

        .scroll-top-btn:active {
          transform: translateY(-3px) scale(1.05);
        }

        .bg-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Effet de glassmorphism sur certains éléments */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }

        /* Smooth scroll pour tous les navigateurs */
        :global(html) {
          scroll-behavior: smooth;
        }

        /* Amélioration des performances d'animation */
        .scroll-top-btn,
        .particle,
        .content-wrapper {
          will-change: transform;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-top: 70px; /* Hauteur du header mobile */
          }

          .content-wrapper {
            min-height: calc(100vh - 70px - 150px);
          }

          .scroll-top-btn {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
          }

          .particle {
            width: 2px;
            height: 2px;
          }
        }

        @media (max-width: 480px) {
          .scroll-top-btn {
            bottom: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
          }
        }

        /* Gestion des animations réduites pour l'accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .particle,
          .scroll-top-btn,
          .content-wrapper {
            animation: none;
          }
          
          .scroll-top-btn:hover {
            transform: none;
          }
        }

        /* Focus pour l'accessibilité */
        .scroll-top-btn:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Layout;