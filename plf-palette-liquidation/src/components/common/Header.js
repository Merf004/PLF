import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, Package } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Effet de scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulation du nombre d'articles dans le panier
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('plf_cart') || '[]');
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil', icon: null },
    { path: '/palettes', label: 'Nos Palettes', icon: Package },
    { path: '/about', label: 'À Propos', icon: null },
    { path: '/contact', label: 'Contact', icon: null }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Package size={32} />
            </div>
            <div className="logo-text">
              <span className="logo-main">PLF</span>
              <span className="logo-sub">Palette Liquidation France</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="nav-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {Icon && <Icon size={18} />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions Desktop */}
          <div className="header-actions">
            <button className="search-btn">
              <Search size={20} />
            </button>
            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
            <button 
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        <div className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-mobile-content">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-mobile-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {Icon && <Icon size={20} />}
                  {item.label}
                </Link>
              );
            })}
            <div className="nav-mobile-divider"></div>
            <Link 
              to="/cart" 
              className="nav-mobile-link cart-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} />
              Panier ({cartCount})
            </Link>
          </div>
        </div>

        {/* Overlay pour mobile */}
        {isMenuOpen && (
          <div 
            className="nav-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(220, 38, 38, 0.1);
          transition: all 0.3s ease;
        }

        .header-scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          height: 80px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-main {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-red);
          line-height: 1;
        }

        .logo-sub {
          font-size: 0.75rem;
          color: var(--gray-medium);
          font-weight: 500;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--gray-dark);
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary-red);
          background-color: var(--light-red);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: var(--primary-red);
          background-color: var(--light-red);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: var(--primary-red);
          border-radius: 50%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-btn,
        .cart-btn {
          background: none;
          border: none;
          color: var(--gray-dark);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-btn:hover,
        .cart-btn:hover {
          color: var(--primary-red);
          background-color: var(--light-red);
          transform: scale(1.1);
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--primary-red);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--gray-dark);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          color: var(--primary-red);
          background-color: var(--light-red);
        }

        .nav-mobile {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(220, 38, 38, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-mobile.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .nav-mobile-content {
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 2rem;
          text-decoration: none;
          color: var(--gray-dark);
          font-weight: 600;
          transition: all 0.3s ease;
          transform: translateX(-20px);
          opacity: 0;
          animation: slideIn 0.5s ease forwards;
        }

        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          color: var(--primary-red);
          background-color: var(--light-red);
          transform: translateX(0);
        }

        .nav-mobile-divider {
          height: 1px;
          background: rgba(220, 38, 38, 0.1);
          margin: 1rem 2rem;
        }

        .cart-mobile {
          color: var(--primary-red) !important;
        }

        .nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
          animation: fadeIn 0.3s ease;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }

          .menu-toggle {
            display: flex;
          }

          .search-btn {
            display: none;
          }

          .logo-text {
            display: none;
          }

          .header-content {
            height: 70px;
          }
        }

        @media (max-width: 480px) {
          .logo-sub {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;