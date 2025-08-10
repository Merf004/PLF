import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  ArrowRight,
  Shield,
  Truck,
  Award,
  Clock
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/palettes', label: 'Nos Palettes' },
    { path: '/about', label: 'À Propos' },
    { path: '/contact', label: 'Contact' }
  ];

  const legalLinks = [
    { path: '/legal/cgu', label: 'CGU' },
    { path: '/legal/cgv', label: 'CGV' },
    { path: '/legal/privacy', label: 'Confidentialité' },
    { path: '/legal/cookies', label: 'Cookies' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Paiement sécurisé',
      description: 'Transactions 100% sécurisées'
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: 'Expédition sous 48h'
    },
    {
      icon: Award,
      title: 'Qualité garantie',
      description: 'Palettes vérifiées'
    },
    {
      icon: Clock,
      title: 'Support 24/7',
      description: 'Assistance dédiée'
    }
  ];

  return (
    <footer className="footer">
      {/* Section avantages */}
      <div className="footer-features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="feature-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Informations entreprise */}
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Package size={32} />
                </div>
                <div className="logo-text">
                  <span className="logo-main">PLF</span>
                  <span className="logo-sub">Palette Liquidation France</span>
                </div>
              </div>
              <p className="footer-description">
                Votre partenaire de confiance pour l'achat de palettes de liquidation. 
                Découvrez des opportunités uniques de revente avec nos palettes 
                soigneusement sélectionnées.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="footer-section">
              <h3 className="footer-title">Navigation</h3>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      <ArrowRight size={16} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informations légales */}
            <div className="footer-section">
              <h3 className="footer-title">Informations</h3>
              <ul className="footer-links">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      <ArrowRight size={16} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h3 className="footer-title">Contact</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={18} />
                  <span>contact@plf-palettes.fr</span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Paris, France</span>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="newsletter">
                <h4>Newsletter</h4>
                <p>Recevez nos meilleures offres</p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Votre email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} PLF - Palette Liquidation France. Tous droits réservés.</p>
            <div className="footer-badges">
              <span className="badge">🇫🇷 Made in France</span>
              <span className="badge">✅ Site sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
        }

        .footer-features {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 3rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(220, 38, 38, 0.1);
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .feature-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .feature-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .footer-main {
          padding: 4rem 0;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }

        .footer-section {
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .footer-section:nth-child(1) { animation-delay: 0.1s; }
        .footer-section:nth-child(2) { animation-delay: 0.2s; }
        .footer-section:nth-child(3) { animation-delay: 0.3s; }
        .footer-section:nth-child(4) { animation-delay: 0.4s; }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
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
          color: white;
          line-height: 1;
        }

        .logo-sub {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--primary-red);
          color: white;
          transform: translateY(-3px) scale(1.1);
        }

        .footer-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--primary-red);
          border-radius: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .footer-link:hover {
          color: var(--primary-red);
          transform: translateX(5px);
        }

        .contact-info {
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .contact-item svg {
          color: var(--primary-red);
          flex-shrink: 0;
        }

        .newsletter h4 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .newsletter p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--primary-red);
        }

        .newsletter-btn {
          padding: 0.75rem;
          background: var(--primary-red);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          background: var(--dark-red);
          transform: scale(1.1);
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .footer-badges {
          display: flex;
          gap: 1rem;
        }

        .badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-features {
            padding: 2rem 0;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .feature-card {
            padding: 1rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-badges {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;