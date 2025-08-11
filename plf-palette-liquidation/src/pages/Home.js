import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  TrendingUp,
  Star,
  ArrowRight,
  Package,
  DollarSign,
  Users,
  Award,
  ChevronDown,
  Eye,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { getFeaturedPalettes } from '../data/palettes';

const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);

  const featuredPalettes = getFeaturedPalettes();

  const addToCart = (palette) => {
    const cart = JSON.parse(localStorage.getItem('plf_cart') || '[]');
    const existingItem = cart.find(item => item.id === palette.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: palette.id,
        name: palette.title,
        description: palette.description,
        price: palette.price,
        originalValue: palette.originalPrice,
        image: palette.images[0],
        category: palette.category || 'Palette',
        quantity: 1
      });
    }

    localStorage.setItem('plf_cart', JSON.stringify(cart));

    // Notify header to update cart count
    window.dispatchEvent(new Event('cart-updated'));

  };


  // Intersection Observer pour les animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const videos = [
    {
      title: "Découvrez nos palettes électroniques",
      description: "Des smartphones aux tablettes, découvrez le potentiel de nos palettes tech",
      thumbnail: "./images/montre.jpg",
      url: "./videos/VID-20250807-WA0002.mp4"
    },
    {
      title: "Comment maximiser vos profits",
      description: "Nos experts vous montrent les meilleures stratégies de revente",
      thumbnail: "./images/vetement.jpg",
      url: "./videos/VID-20250807-WA0003.mp4"
    },
    {
      title: "Témoignages de nos clients",
      description: "Découvrez les success stories de nos revendeurs partenaires",
      thumbnail: "./images/crampon.jpg",
      url: "./videos/VID-20250807-WA0006.mp4"
    }
  ];

  const stats = [
    { icon: Package, number: "10,000+", label: "Palettes vendues", color: "#DC2626" },
    { icon: Users, number: "2,500+", label: "Clients satisfaits", color: "#059669" },
    { icon: DollarSign, number: "€2M+", label: "Profits générés", color: "#7C3AED" },
    { icon: Award, number: "98%", label: "Taux de satisfaction", color: "#EA580C" }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      business: "Boutique en ligne",
      text: "Grâce à PLF, j'ai multiplié mon chiffre d'affaires par 3 en 6 mois !",
      rating: 5,
      profit: "+300%"
    },
    {
      name: "Thomas K.",
      business: "Revendeur marketplace",
      text: "Des palettes de qualité, un service irréprochable. Je recommande !",
      rating: 5,
      profit: "+250%"
    },
    {
      name: "Sophie M.",
      business: "Magasin physique",
      text: "PLF m'a permis de diversifier mon stock avec des produits tendance.",
      rating: 5,
      profit: "+180%"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section avec vidéo de fond */}
      <section className="hero" id="hero">
        <div className="hero-background">
          <div className="hero-image-container">
            <div className="hero-overlay"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-title-main">PLF</span>
                <span className="hero-title-sub">Palette Liquidation France</span>
              </h1>
              <p className="hero-description">
                Transformez votre business avec nos palettes de liquidation premium.
                Des opportunités uniques, des profits garantis.
              </p>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="stat-number">2500+</span>
                  <span className="stat-label">Clients</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">48h</span>
                  <span className="stat-label">Livraison</span>
                </div>
              </div>
              <div className="hero-actions">
                <Link to="/palettes" className="btn-hero primary">
                  <Package size={20} />
                  Découvrir nos palettes
                </Link>
                <button className="btn-hero secondary" onClick={() => setIsVideoPlaying(true)}>
                  <Play size={20} />
                  Voir la démo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Section Vidéos */}
      <section className={`videos-section ${visibleSections.videos ? 'visible' : ''}`} id="videos">
        <div className="container">
          <div className="section-header">
            <h2>Découvrez PLF en vidéo</h2>
            <p>Plongez dans l'univers des palettes de liquidation</p>
          </div>

          <div className="videos-grid">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`video-card ${playingVideo === index ? 'playing' : ''}`}
                onClick={() => setPlayingVideo(playingVideo === index ? null : index)}
              >
                <div className="video-container">
                  {playingVideo === index ? (
                    <iframe
                      src={`${video.url}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="video-iframe"
                    ></iframe>
                  ) : (
                    <>
                      <img src={video.thumbnail} alt={video.title} className="video-thumbnail-img" />
                      <div className="video-overlay">
                        <div className="play-button">
                          <Play size={24} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="video-content">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className={`stats-section ${visibleSections.stats ? 'visible' : ''}`} id="stats">
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
                  <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)` }}>
                    <Icon size={28} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number" data-target={stat.number}>
                      {stat.number}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Palettes vedettes */}
      <section className={`featured-section ${visibleSections.featured ? 'visible' : ''}`} id="featured">
        <div className="container">
          <div className="section-header">
            <h2>Palettes en vedette</h2>
            <p>Nos meilleures opportunités du moment</p>
          </div>

          <div className="palettes-grid">
            {featuredPalettes.map((palette, index) => (
              <div
                key={palette.id}
                className="palette-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="palette-image">
                  <img src={palette.images[0]} alt={palette.title} />
                  <div className="palette-badges">
                    <span className="badge featured">⭐ Vedette</span>
                    <span className="badge grade">{palette.condition}</span>
                  </div>
                  <div className="palette-overlay">
                    <Link to={`/palette/${palette.id}`} className="btn-overlay">
                      <Eye size={18} />
                      Voir détails
                    </Link>
                  </div>
                </div>

                <div className="palette-content">
                  <h3>{palette.title}</h3>
                  <p>{palette.description}</p>

                  <div className="palette-info">
                    <div className="info-item">
                      <Package size={16} />
                      <span>{palette.quantity} articles</span>
                    </div>
                    <div className="info-item">
                      <TrendingUp size={16} />
                      <span>{palette.estimatedProfit}</span>
                    </div>
                  </div>

                  <div className="palette-price">
                    <span className="price-current">{palette.price}€</span>
                    <span className="price-original">{palette.originalPrice}€</span>
                    <span className="price-discount">-{Math.round((1 - palette.price / palette.originalPrice) * 100)}%</span>
                  </div>

                  <div className="palette-actions">
                    <button
                      className="btn-add-cart"
                      onClick={() => addToCart(palette)}
                    >
                      <ShoppingCart size={18} />
                      Ajouter au panier
                    </button>
                    <Link to={`/palette/${palette.id}`} className="btn-details">
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/palettes" className="btn-view-all">
              Voir toutes nos palettes
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className={`testimonials-section ${visibleSections.testimonials ? 'visible' : ''}`} id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Ils ont réussi avec PLF</h2>
            <p>Découvrez les success stories de nos clients</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.business}</p>
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <div className="testimonial-profit">
                    <Zap size={16} />
                    <span>{testimonial.profit}</span>
                  </div>
                </div>
                <blockquote className="testimonial-text">
                  "{testimonial.text}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="cta-section" id="cta">
        <div className="cta-background">
          <div className="cta-particles">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container">
          <div className="cta-content">
            <h2>Prêt à transformer votre business ?</h2>
            <p>Rejoignez plus de 2500 entrepreneurs qui font confiance à PLF</p>
            <div className="cta-actions">
              <Link to="/palettes" className="btn-cta primary">
                <Package size={20} />
                Commencer maintenant
              </Link>
              <Link to="/contact" className="btn-cta secondary">
                <ArrowRight size={20} />
                Demander conseil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal vidéo */}
      {isVideoPlaying && (
        <div className="video-modal" onClick={() => setIsVideoPlaying(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={() => setIsVideoPlaying(false)}>
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="PLF Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        .home {
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(220, 38, 38, 0.8) 0%,
            rgba(185, 28, 28, 0.6) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
        }

        .hero-title {
          margin-bottom: 2rem;
          animation: heroSlideUp 1s ease-out;
        }

        .hero-title-main {
          display: block;
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: 3px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #ffffff, #f3f4f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title-sub {
          display: block;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 0.5rem;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.3rem;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          opacity: 0.95;
          animation: heroSlideUp 1s ease-out 0.2s both;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          animation: heroSlideUp 1s ease-out 0.4s both;
        }

        .hero-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.8;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          animation: heroSlideUp 1s ease-out 0.6s both;
        }

        .btn-hero {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1.1rem;
        }

        .btn-hero.primary {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        .btn-hero.primary:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.6);
        }

        .btn-hero.secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-hero.secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          animation: bounce 2s infinite;
          cursor: pointer;
        }

        .hero-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('./images/fond.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: heroZoom 20s ease-in-out infinite alternate;
}


/* Éléments flottants animés */
.hero-animated-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

/* Animation de pulsation pour l'overlay */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.7) 0%,
    rgba(185, 28, 28, 0.5) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  animation: overlayPulse 8s ease-in-out infinite;
}

@keyframes overlayPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Animation améliorée pour le contenu hero */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  animation: heroContentGlow 4s ease-in-out infinite;
}

@keyframes heroContentGlow {
  0%, 100% {
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
  50% {
    text-shadow: 0 4px 30px rgba(220, 38, 38, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
  }
}

/* Animation pour l'indicateur de scroll */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  animation: scrollBounce 2s ease-in-out infinite, scrollGlow 3s ease-in-out infinite;
  cursor: pointer;
}

@keyframes scrollBounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40%, 43% {
    transform: translateX(-50%) translateY(-10px);
  }
  70% {
    transform: translateX(-50%) translateY(-5px);
  }
  90% {
    transform: translateX(-50%) translateY(-2px);
  }
}

@keyframes scrollGlow {
  0%, 100% {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(220, 38, 38, 0.8));
  }
}

        /* Videos Section */
        .videos-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .videos-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 3rem;
          color: var(--gray-dark);
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.2rem;
          color: var(--gray-medium);
          max-width: 600px;
          margin: 0 auto;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .video-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(20px);
          opacity: 0;
          animation: slideUp 0.6s ease forwards;
        }

        .video-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
        }

        .video-card.active {
          border: 3px solid var(--primary-red);
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.3);
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .video-card:hover .video-thumbnail img {
          transform: scale(1.1);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(220, 38, 38, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          background: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-red);
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }

        .video-card:hover .play-button {
          transform: scale(1);
        }

        .video-content {
          padding: 1.5rem;
        }

        .video-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--gray-dark);
        }

        .video-content p {
          color: var(--gray-medium);
          font-size: 0.95rem;
        }

        .video-player iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

.video-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.video-thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.video-card:hover .video-thumbnail-img {
  transform: scale(1.1);
}

.video-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.video-card.playing {
  transform: scale(1.05);
  box-shadow: 0 25px 50px rgba(220, 38, 38, 0.3);
  border: 2px solid var(--primary-red);
}

.video-card.playing .video-content {
  background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
  color: white;
}

.video-card.playing .video-content h3 {
  color: white;
}

.video-card.playing .video-content p {
  color: rgba(255, 255, 255, 0.9);
}

/* Animation pour la transition */
.video-container {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card.playing .video-container {
  height: 300px;
  box-shadow: inset 0 0 20px rgba(220, 38, 38, 0.3);
}

/* Style pour le bouton play amélioré */
.play-button {
  background: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-red);
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.video-card:hover .play-button {
  transform: scale(1.1);
  background: var(--primary-red);
  color: white;
  box-shadow: 0 15px 40px rgba(220, 38, 38, 0.4);
}

        /* Stats Section */
        .stats-section {
          padding: 4rem 0;
          background: var(--primary-red);
          color: white;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .stats-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: statSlideUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .stat-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem auto;
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Featured Section */
        .featured-section {
          padding: 6rem 0;
          background: white;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .featured-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .palettes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .palette-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px);
          animation: paletteSlideUp 0.8s ease forwards;
        }

        .palette-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 60px rgba(220, 38, 38, 0.2);
        }

        .palette-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .palette-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .palette-card:hover .palette-image img {
          transform: scale(1.1);
        }

        .palette-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .badge {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .badge.featured {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
        }

        .badge.grade {
          color: var(--primary-red);
        }

        .palette-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(220, 38, 38, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .palette-card:hover .palette-overlay {
          opacity: 1;
        }

        .btn-overlay {
          background: white;
          color: var(--primary-red);
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-overlay:hover {
          transform: scale(1.1);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .palette-content {
          padding: 1.5rem;
        }

        .palette-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: var(--gray-dark);
        }

        .palette-content p {
          color: var(--gray-medium);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .palette-info {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--gray-medium);
        }

        .info-item svg {
          color: var(--primary-red);
        }

        .palette-price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .price-current {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary-red);
        }

        .price-original {
          font-size: 1.1rem;
          color: var(--gray-medium);
          text-decoration: line-through;
        }

        .price-discount {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .palette-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn-add-cart {
          flex: 1;
          background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-add-cart:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }

        .btn-details {
          background: var(--light-red);
          color: var(--primary-red);
          border: none;
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-details:hover {
          background: var(--primary-red);
          color: white;
          transform: rotate(90deg);
        }

        .section-footer {
          text-align: center;
          margin-top: 3rem;
        }

        .btn-view-all {
          background: transparent;
          color: var(--primary-red);
          border: 2px solid var(--primary-red);
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-view-all:hover {
          background: var(--primary-red);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }

        /* Testimonials Section */
        .testimonials-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, var(--primary-red) 0%, var(--dark-red) 100%);
          color: white;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .testimonials-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .testimonials-section .section-header h2 {
          color: white;
        }

        .testimonials-section .section-header p {
          color: rgba(255, 255, 255, 0.8);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
          animation: testimonialSlideUp 0.8s ease forwards;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          color: var(--primary-red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
        }

        .testimonial-info {
          flex: 1;
        }

        .testimonial-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }

        .testimonial-info p {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          color: #FCD34D;
        }

        .testimonial-profit {
          background: rgba(16, 185, 129, 0.2);
          color: #10B981;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .testimonial-text {
          font-style: italic;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
          opacity: 0.95;
        }

        /* CTA Section */
        .cta-section {
          position: relative;
          padding: 6rem 0;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          overflow: hidden;
        }

        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .cta-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--primary-red);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff, #DC2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .cta-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .btn-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1.1rem;
        }

        .btn-cta.primary {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        .btn-cta.primary:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 50px rgba(220, 38, 38, 0.6);
        }

        .btn-cta.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-cta.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }

        /* Video Modal */
        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .video-modal-content {
          position: relative;
          width: 90%;
          max-width: 800px;
          height: 0;
          padding-bottom: 56.25%;
          border-radius: 12px;
          overflow: hidden;
        }

        .video-modal-content iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .video-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: var(--primary-red);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Animations */
        @keyframes heroSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40%, 43% {
            transform: translateX(-50%) translateY(-10px);
          }
          70% {
            transform: translateX(-50%) translateY(-5px);
          }
          90% {
            transform: translateX(-50%) translateY(-2px);
          }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes statSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes paletteSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes testimonialSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes particleFloat {
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-title-main {
            font-size: 4rem;
          }

          .hero-stats {
            gap: 2rem;
          }

          .palettes-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .hero {
            height: 100vh;
            text-align: center;
          }

          .hero-title-main {
            font-size: 3rem;
            letter-spacing: 1px;
          }

          .hero-title-sub {
            font-size: 1.2rem;
          }

          .hero-description {
            font-size: 1.1rem;
            padding: 0 1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-actions {
            flex-direction: column;
            gap: 1rem;
            padding: 0 1rem;
          }

          .btn-hero {
            width: 100%;
            justify-content: center;
            max-width: 300px;
          }

          .section-header h2 {
            font-size: 2.2rem;
          }

          .videos-grid {
            grid-template-columns: 1fr;
          }

          .palettes-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .cta-content h2 {
            font-size: 2.2rem;
          }

          .cta-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-cta {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title-main {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .section-header h2 {
            font-size: 1.8rem;
          }

          .palette-card {
            margin: 0 0.5rem;
          }

          .video-modal-content {
            width: 95%;
          }

          .video-close {
            top: -40px;
            width: 35px;
            height: 35px;
          }
        }

        /* Performance optimizations */
        .hero-video,
        .particle,
        .palette-card,
        .testimonial-card {
          will-change: transform;
        }

        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .hero-title,
          .hero-description,
          .hero-actions,
          .palette-card,
          .testimonial-card,
          .particle {
            animation: none;
          }
          
          .btn-hero:hover,
          .palette-card:hover,
          .testimonial-card:hover {
            transform: none;
          }
        }

        /* Focus states pour l'accessibilité */
        .btn-hero:focus,
        .btn-add-cart:focus,
        .btn-details:focus,
        .btn-view-all:focus,
        .btn-cta:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Home;