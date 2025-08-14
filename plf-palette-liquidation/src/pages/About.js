import React from 'react';
import {
  Package,
  Users,
  Award,
  Target,
  Shield,
  Truck,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: '500+', label: 'Palettes vendues', icon: Package },
    { number: '100+', label: 'Clients satisfaits', icon: Users },
    { number: '3', label: 'Années d\'expérience', icon: Award },
    { number: '99%', label: 'Taux de satisfaction', icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Transparence',
      description: 'Nous vous fournissons des descriptions détaillées et des photos réelles de chaque palette.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Chaque palette est soigneusement inspectée avant la mise en vente pour garantir la meilleure qualité.'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Notre équipe dédiée vous accompagne à chaque étape de votre achat et après-vente.'
    },
    {
      icon: Truck,
      title: 'Logistique',
      description: 'Expédition rapide et sécurisée dans toute la France avec suivi en temps réel.'
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Création de PLF',
      description: 'Lancement de Palette Liquidation France avec une vision claire : démocratiser l\'achat de palettes de liquidation.'
    },
    {
      year: '2023',
      title: 'Expansion nationale',
      description: 'Extension de nos services à toute la France avec un réseau de partenaires logistiques.'
    },
    {
      year: '2024',
      title: 'Innovation digitale',
      description: 'Lancement de notre plateforme en ligne nouvelle génération pour une expérience d\'achat optimisée.'
    },
    {
      year: '2025',
      title: 'Leadership du marché',
      description: 'PLF devient la référence française de la vente de palettes de liquidation en ligne.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>À Propos de PLF</h1>
              <p className="hero-subtitle">
                Palette Liquidation France, votre partenaire de confiance pour l'achat
                de palettes de liquidation de qualité.
              </p>
              <div className="hero-features">
                <div className="feature-badge">
                  <CheckCircle size={20} />
                  <span>100% Français</span>
                </div>
                <div className="feature-badge">
                  <CheckCircle size={20} />
                  <span>Qualité garantie</span>
                </div>
                <div className="feature-badge">
                  <CheckCircle size={20} />
                  <span>Service premium</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-card">
                <Package size={80} />
                <h3>PLF</h3>
                <p>Votre succès, notre mission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stat-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon size={32} />
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Notre Histoire</h2>
              <p>
                PLF - Palette Liquidation France est née d'une passion pour l'entrepreneuriat
                et d'une vision claire : rendre accessible à tous l'achat de palettes de
                liquidation de qualité.
              </p>
              <p>
                Fondée par une équipe d'experts du secteur, nous avons développé un réseau
                de partenaires fiables nous permettant de proposer les meilleures opportunités
                du marché français.
              </p>
              <div className="story-highlights">
                <div className="highlight">
                  <Target size={24} />
                  <div>
                    <h4>Notre Mission</h4>
                    <p>Démocratiser l'accès aux palettes de liquidation</p>
                  </div>
                </div>
                <div className="highlight">
                  <Award size={24} />
                  <div>
                    <h4>Notre Vision</h4>
                    <p>Devenir la référence française du secteur</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <Package size={120} />
                <p>L'excellence française au service de votre réussite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Nos Valeurs</h2>
            <p>Les principes qui guident notre action au quotidien</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="value-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="value-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Notre Parcours</h2>
            <p>Les étapes clés de notre développement</p>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à commencer ?</h2>
            <p>Découvrez nos palettes de liquidation et trouvez les opportunités qui vous correspondent.</p>
            <div className="cta-buttons">
              <Link to="/palettes" className="btn-primary">
                Voir les palettes
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 30px;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          font-size: 0.9rem;
        }

        .hero-image {
          display: flex;
          justify-content: center;
        }

        .hero-card {
          background: white;
          color: #dc2626;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          transform: rotate(-5deg);
          animation: float 6s ease-in-out infinite;
        }

        .hero-card h3 {
          font-size: 2rem;
          font-weight: 800;
          margin: 20px 0 10px;
        }

        @keyframes float {
          0%, 100% { transform: rotate(-5deg) translateY(0px); }
          50% { transform: rotate(-5deg) translateY(-20px); }
        }

        /* Stats Section */
        .stats-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: white;
          padding: 40px 30px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(20px);
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
        }

        .stat-card svg {
          color: #dc2626;
          margin-bottom: 20px;
        }

        .stat-card h3 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #dc2626;
          margin-bottom: 10px;
        }

        .stat-card p {
          color: #64748b;
          font-weight: 500;
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Story Section */
        .story-section {
          padding: 100px 0;
        }

        .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .story-text h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 30px;
        }

        .story-text p {
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 25px;
          font-size: 1.1rem;
        }

        .story-highlights {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .highlight {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .highlight svg {
          color: #dc2626;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .highlight h4 {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .highlight p {
          color: #64748b;
          margin: 0;
        }

        .story-image {
          display: flex;
          justify-content: center;
        }

        .image-placeholder {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 60px 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.3);
        }

        .image-placeholder p {
          margin-top: 20px;
          font-weight: 500;
        }

        /* Values Section */
        .values-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 20px;
        }

        .section-header p {
          font-size: 1.2rem;
          color: #64748b;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
        }

        .value-card {
          background: white;
          padding: 40px 30px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(30px);
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .value-icon {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
        }

        .value-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 15px;
        }

        .value-card p {
          color: #64748b;
          line-height: 1.7;
        }

        /* Timeline Section */
        .timeline-section {
          padding: 100px 0;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #dc2626, #b91c1c);
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          margin: 60px 0;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .timeline-item.left .timeline-content {
          margin-right: 60%;
          text-align: right;
        }

        .timeline-item.right .timeline-content {
          margin-left: 60%;
          text-align: left;
        }

        .timeline-content {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .timeline-year {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 15px;
        }

        .timeline-content h3 {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .timeline-content p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 30px;
          width: 20px;
          height: 20px;
          background: #dc2626;
          border: 4px solid white;
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 0 4px #dc2626;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: #1e293b;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .story-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .timeline::before {
            left: 20px;
          }

          .timeline-item.left .timeline-content,
          .timeline-item.right .timeline-content {
            margin-left: 60px;
            margin-right: 0;
            text-align: left;
          }

          .timeline-dot {
            left: 20px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default About;