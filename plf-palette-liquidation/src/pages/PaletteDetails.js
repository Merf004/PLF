import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  TrendingUp,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  MapPin,
  Clock,
  Award,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getPaletteById, getAvailablePalettes } from '../data/palettes';

const PaletteDetails = () => {
  const { id } = useParams();
  const [palette, setPalette] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isLiked, setIsLiked] = useState(false);
  const [relatedPalettes, setRelatedPalettes] = useState([]);

  useEffect(() => {
    const paletteData = getPaletteById(parseInt(id));
    if (paletteData) {
      setPalette(paletteData);
      // Charger les palettes similaires
      const allPalettes = getAvailablePalettes();
      const related = allPalettes
        .filter(p => p.id !== paletteData.id && p.category === paletteData.category)
        .slice(0, 3);
      setRelatedPalettes(related);
    }
  }, [id]);

  if (!palette) {
    return (
      <div className="palette-not-found">
        <div className="container">
          <Package size={64} />
          <h2>Palette non trouvée</h2>
          <p>La palette que vous recherchez n'existe pas ou n'est plus disponible.</p>
          <Link to="/palettes" className="btn-back">
            <ArrowLeft size={18} />
            Retour aux palettes
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === palette.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? palette.images.length - 1 : prev - 1
    );
  };

const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('plf_cart') || '[]');
  const existingItem = cart.find(item => item.id === palette.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: palette.id,
      name: palette.title,
      description: palette.description,
      price: palette.price,
      originalValue: palette.originalPrice,
      image: palette.images[0],
      category: palette.category,
      quantity: quantity
    });
  }
  
  localStorage.setItem('plf_cart', JSON.stringify(cart));
  
  // Notify header to update cart count
  window.dispatchEvent(new Event('cart-updated'));

};

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: palette.title,
          text: palette.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erreur de partage:', err);
      }
    } else {
      // Fallback - copier l'URL
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const discountPercentage = Math.round((1 - palette.price / palette.originalPrice) * 100);

  return (
    <div className="palette-details">
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Accueil</Link>
            <span>/</span>
            <Link to="/palettes">Nos palettes</Link>
            <span>/</span>
            <span>{palette.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="product-section">
        <div className="container">
          <div className="product-layout">
            {/* Image Gallery */}
            <div className="product-gallery">
              <div className="main-image">
                <img 
                  src={palette.images[currentImageIndex]} 
                  alt={palette.title}
                />
                {palette.images.length > 1 && (
                  <>
                    <button className="nav-btn prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="nav-btn next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                <div className="image-badges">
                  {palette.featured && <span className="badge featured">⭐ Vedette</span>}
                  <span className="badge grade">{palette.condition}</span>
                  {palette.limitedTime && <span className="badge limited">⏰ Offre limitée</span>}
                </div>
              </div>
              
              {palette.images.length > 1 && (
                <div className="image-thumbnails">
                  {palette.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`${palette.title} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-header">
                <h1>{palette.title}</h1>
                <div className="product-actions-header">
                  <button 
                    className={`action-btn ${isLiked ? 'liked' : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  <button className="action-btn" onClick={shareProduct}>
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(palette.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="rating-value">({palette.rating}/5)</span>
              </div>

              <p className="product-description">{palette.description}</p>

              <div className="product-highlights">
                <div className="highlight-item">
                  <Package size={20} />
                  <span>{palette.quantity} articles inclus</span>
                </div>
                <div className="highlight-item">
                  <TrendingUp size={20} />
                  <span>Profit estimé: {palette.estimatedProfit}</span>
                </div>
                <div className="highlight-item">
                  <Award size={20} />
                  <span>Condition: {palette.condition}</span>
                </div>
                <div className="highlight-item">
                  <Truck size={20} />
                  <span>Livraison sous 48h</span>
                </div>
              </div>

              <div className="product-pricing">
                <div className="price-main">
                  <span className="current-price">{palette.price}€</span>
                  <span className="original-price">{palette.originalPrice}€</span>
                </div>
                <div className="price-savings">
                  <span className="discount-badge">-{discountPercentage}%</span>
                  <span className="savings-text">
                    Vous économisez {palette.originalPrice - palette.price}€
                  </span>
                </div>
              </div>

              <div className="product-purchase">
                <div className="quantity-selector">
                  <label>Quantité:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="purchase-actions">
                  <button className="btn-add-to-cart" onClick={addToCart}>
                    <ShoppingCart size={20} />
                    Ajouter au panier
                  </button>
                  <div className="total-price">
                    Total: <strong>{palette.price * quantity}€</strong>
                  </div>
                </div>
              </div>

              <div className="trust-signals">
                <div className="trust-item">
                  <Shield size={16} />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="trust-item">
                  <Truck size={16} />
                  <span>Livraison gratuite dès 500€</span>
                </div>
                <div className="trust-item">
                  <CheckCircle size={16} />
                  <span>Garantie satisfait ou remboursé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="product-tabs">
        <div className="container">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
              onClick={() => setSelectedTab('description')}
            >
              <Info size={18} />
              Description détaillée
            </button>
            <button 
              className={`tab-btn ${selectedTab === 'contents' ? 'active' : ''}`}
              onClick={() => setSelectedTab('contents')}
            >
              <Package size={18} />
              Contenu de la palette
            </button>
            <button 
              className={`tab-btn ${selectedTab === 'delivery' ? 'active' : ''}`}
              onClick={() => setSelectedTab('delivery')}
            >
              <Truck size={18} />
              Livraison & Retours
            </button>
          </div>

          <div className="tabs-content">
            {selectedTab === 'description' && (
              <div className="tab-content">
                <h3>À propos de cette palette</h3>
                <p>
                  Cette palette {palette.title.toLowerCase()} représente une opportunité exceptionnelle 
                  pour les revendeurs et entrepreneurs. Avec un potentiel de profit de {palette.estimatedProfit}, 
                  elle contient {palette.quantity} articles soigneusement sélectionnés.
                </p>
                <h4>Caractéristiques principales :</h4>
                <ul>
                  <li>Condition: {palette.condition} - Produits en excellent état</li>
                  <li>Quantité: {palette.quantity} articles variés</li>
                  <li>Profit estimé: {palette.estimatedProfit}</li>
                  <li>Catégorie: {palette.category}</li>
                  <li>Note client: {palette.rating}/5 étoiles</li>
                </ul>
              </div>
            )}

            {selectedTab === 'contents' && (
              <div className="tab-content">
                <h3>Contenu de la palette</h3>
                <div className="contents-grid">
                  <div className="content-item">
                    <Package size={24} />
                    <div>
                      <h4>Articles inclus</h4>
                      <p>{palette.quantity} produits assortis de qualité</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <Star size={24} />
                    <div>
                      <h4>Condition</h4>
                      <p>{palette.condition} - Contrôlé qualité</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <TrendingUp size={24} />
                    <div>
                      <h4>Potentiel de revente</h4>
                      <p>Profit estimé de {palette.estimatedProfit}</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <Eye size={24} />
                    <div>
                      <h4>Transparence</h4>
                      <p>Photos réelles de la palette</p>
                    </div>
                  </div>
                </div>
                <div className="content-warning">
                  <AlertCircle size={20} />
                  <p>
                    <strong>Important:</strong> Le contenu exact peut varier légèrement. 
                    Les photos sont représentatives de la qualité et du type de produits inclus.
                  </p>
                </div>
              </div>
            )}

            {selectedTab === 'delivery' && (
              <div className="tab-content">
                <h3>Livraison et Retours</h3>
                <div className="delivery-grid">
                  <div className="delivery-item">
                    <Truck size={24} />
                    <div>
                      <h4>Livraison rapide</h4>
                      <p>Expédition sous 24h - Livraison en 48h partout en France</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <MapPin size={24} />
                    <div>
                      <h4>Zone de livraison</h4>
                      <p>France métropolitaine et DOM-TOM</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <Shield size={24} />
                    <div>
                      <h4>Garantie</h4>
                      <p>Satisfait ou remboursé sous 7 jours</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <Clock size={24} />
                    <div>
                      <h4>Suivi de commande</h4>
                      <p>Numéro de suivi fourni dès l'expédition</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Palettes */}
      {relatedPalettes.length > 0 && (
        <section className="related-section">
          <div className="container">
            <h2>Palettes similaires</h2>
            <div className="related-grid">
              {relatedPalettes.map((relatedPalette) => (
                <div key={relatedPalette.id} className="related-card">
                  <div className="related-image">
                    <img src={relatedPalette.images[0]} alt={relatedPalette.title} />
                    <div className="related-overlay">
                      <Link to={`/palette/${relatedPalette.id}`} className="btn-view">
                        <Eye size={16} />
                        Voir
                      </Link>
                    </div>
                  </div>
                  <div className="related-content">
                    <h4>{relatedPalette.title}</h4>
                    <div className="related-price">
                      <span className="price">{relatedPalette.price}€</span>
                      <span className="original">{relatedPalette.originalPrice}€</span>
                    </div>
                    <div className="related-info">
                      <span className="quantity">{relatedPalette.quantity} articles</span>
                      <span className="profit">{relatedPalette.estimatedProfit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .palette-details {
          background: #f8fafc;
          min-height: 100vh;
        }

        /* Breadcrumb */
        .breadcrumb {
          background: white;
          padding: 1rem 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .breadcrumb-nav a {
          color: var(--primary-red);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .breadcrumb-nav a:hover {
          opacity: 0.7;
        }

        .breadcrumb-nav span:last-child {
          color: var(--gray-medium);
          font-weight: 500;
        }

        /* Product Section */
        .product-section {
          padding: 3rem 0;
        }

        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Gallery */
        .product-gallery {
          position: sticky;
          top: 2rem;
        }

        .main-image {
          position: relative;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 1rem;
          background: white;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--gray-dark);
        }

        .nav-btn:hover {
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn.prev {
          left: 1rem;
        }

        .nav-btn.next {
          right: 1rem;
        }

        .image-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .image-thumbnails {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding: 0.5rem 0;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .thumbnail:hover {
          transform: scale(1.05);
        }

        .thumbnail.active {
          border-color: var(--primary-red);
          box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Product Info */
        .product-info {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          height: fit-content;
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .product-header h1 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--gray-dark);
          line-height: 1.2;
          flex: 1;
          margin-right: 1rem;
        }

        .product-actions-header {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          background: white;
          color: var(--gray-medium);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          border-color: var(--primary-red);
          color: var(--primary-red);
          transform: scale(1.05);
        }

        .action-btn.liked {
          background: var(--primary-red);
          border-color: var(--primary-red);
          color: white;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .stars {
          display: flex;
          gap: 0.25rem;
          color: #FCD34D;
        }

        .rating-value {
          color: var(--gray-medium);
          font-weight: 500;
        }

        .product-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--gray-medium);
          margin-bottom: 2rem;
        }

        .product-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid var(--primary-red);
        }

        .highlight-item svg {
          color: var(--primary-red);
          flex-shrink: 0;
        }

        .highlight-item span {
          font-weight: 500;
          color: var(--gray-dark);
        }

        .product-pricing {
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          border-radius: 16px;
          border: 1px solid #fecaca;
        }

        .price-main {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .current-price {
          font-size: 3rem;
          font-weight: 900;
          color: var(--primary-red);
        }

        .original-price {
          font-size: 1.5rem;
          color: var(--gray-medium);
          text-decoration: line-through;
        }

        .price-savings {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .discount-badge {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-weight: 700;
          font-size: 1rem;
        }

        .savings-text {
          color: var(--gray-dark);
          font-weight: 600;
        }

        /* Purchase Section */
        .product-purchase {
          margin-bottom: 2rem;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .quantity-selector label {
          font-weight: 600;
          color: var(--gray-dark);
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background: white;
        }

        .quantity-controls button {
          width: 40px;
          height: 40px;
          border: none;
          background: #f8fafc;
          color: var(--gray-dark);
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .quantity-controls button:hover:not(:disabled) {
          background: var(--primary-red);
          color: white;
        }

        .quantity-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-controls span {
          padding: 0 1.5rem;
          font-weight: 600;
          color: var(--gray-dark);
          min-width: 60px;
          text-align: center;
        }

        .purchase-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .btn-add-to-cart {
          flex: 1;
          background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 15px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .btn-add-to-cart:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }

        .total-price {
          font-size: 1.2rem;
          color: var(--gray-dark);
          white-space: nowrap;
        }

        .total-price strong {
          color: var(--primary-red);
          font-size: 1.4rem;
        }

        /* Trust Signals */
        .trust-signals {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 12px;
          border: 1px solid #bbf7d0;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #059669;
          font-weight: 500;
        }

        .trust-item svg {
          flex-shrink: 0;
        }

        /* Tabs Section */
        .product-tabs {
          background: white;
          padding: 3rem 0;
        }

        .tabs-header {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          color: var(--gray-medium);
          font-weight: 600;
          cursor: pointer;
          border-radius: 12px 12px 0 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-btn:hover {
          color: var(--primary-red);
          background: #fef2f2;
        }

        .tab-btn.active {
          color: var(--primary-red);
          background: white;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary-red);
        }

        .tabs-content {
          background: white;
          padding: 2rem;
          border-radius: 0 16px 16px 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .tab-content h3 {
          font-size: 1.5rem;
          color: var(--gray-dark);
          margin-bottom: 1rem;
        }

        .tab-content h4 {
          color: var(--gray-dark);
          margin: 1.5rem 0 0.5rem 0;
        }

        .tab-content p {
          color: var(--gray-medium);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .tab-content ul {
          color: var(--gray-medium);
          line-height: 1.8;
          padding-left: 1.5rem;
        }

        .tab-content li {
          margin-bottom: 0.5rem;
        }

        .contents-grid,
        .delivery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .content-item,
        .delivery-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 16px;
          border-left: 4px solid var(--primary-red);
          transition: all 0.3s ease;
        }

        .content-item:hover,
        .delivery-item:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .content-item svg,
        .delivery-item svg {
          color: var(--primary-red);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .content-item h4,
        .delivery-item h4 {
          color: var(--gray-dark);
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
        }

        .content-item p,
        .delivery-item p {
          color: var(--gray-medium);
          margin: 0;
          line-height: 1.5;
        }

        .content-warning {
          background: #fffbeb;
          border: 1px solid #fbbf24;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .content-warning svg {
          color: #f59e0b;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .content-warning p {
          color: var(--gray-dark);
          margin: 0;
          font-size: 0.95rem;
        }

        /* Related Section */
        .related-section {
          padding: 4rem 0;
          background: #f8fafc;
        }

        .related-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: var(--gray-dark);
          margin-bottom: 3rem;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .related-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .related-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(220, 38, 38, 0.2);
        }

        .related-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .related-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .related-card:hover .related-image img {
          transform: scale(1.1);
        }

        .related-overlay {
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

        .related-card:hover .related-overlay {
          opacity: 1;
        }

        .btn-view {
          background: white;
          color: var(--primary-red);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-view:hover {
          transform: scale(1.1);
        }

        .related-content {
          padding: 1.5rem;
        }

        .related-content h4 {
          color: var(--gray-dark);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .related-price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .related-price .price {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--primary-red);
        }

        .related-price .original {
          font-size: 1rem;
          color: var(--gray-medium);
          text-decoration: line-through;
        }

        .related-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--gray-medium);
        }

        .related-info .profit {
          color: #059669;
          font-weight: 600;
        }

        /* Badges */
        .badge {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: fit-content;
        }

        .badge.featured {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
        }

        .badge.grade {
          color: var(--primary-red);
          background: white;
        }

        .badge.limited {
          background: linear-gradient(135deg, #EA580C, #DC2626);
          color: white;
          animation: pulse 2s infinite;
        }

        /* Not Found */
        .palette-not-found {
          padding: 6rem 0;
          text-align: center;
          background: #f8fafc;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }

        .palette-not-found svg {
          color: var(--gray-light);
          margin-bottom: 1.5rem;
        }

        .palette-not-found h2 {
          font-size: 2rem;
          color: var(--gray-dark);
          margin-bottom: 1rem;
        }

        .palette-not-found p {
          color: var(--gray-medium);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-red);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .product-gallery {
            position: static;
          }

          .main-image {
            height: 400px;
          }

          .product-highlights {
            grid-template-columns: 1fr;
          }

          .trust-signals {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .product-info {
            padding: 2rem;
          }

          .product-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .product-actions-header {
            align-self: flex-end;
          }

          .product-header h1 {
            font-size: 1.8rem;
            margin-right: 0;
          }

          .current-price {
            font-size: 2.5rem;
          }

          .price-savings {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .purchase-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-add-to-cart {
            width: 100%;
          }

          .tabs-header {
            flex-direction: column;
            gap: 0;
          }

          .tab-btn {
            border-radius: 0;
            justify-content: center;
          }

          .tabs-content {
            border-radius: 16px;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .product-section {
            padding: 2rem 0;
          }

          .product-info {
            padding: 1.5rem;
          }

          .main-image {
            height: 300px;
          }

          .product-header h1 {
            font-size: 1.5rem;
          }

          .current-price {
            font-size: 2rem;
          }

          .quantity-selector {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .image-thumbnails {
            gap: 0.5rem;
          }

          .thumbnail {
            width: 60px;
            height: 60px;
          }

          .breadcrumb-nav {
            font-size: 0.8rem;
            flex-wrap: wrap;
          }
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Variables CSS */
        :root {
          --primary-red: #DC2626;
          --dark-red: #B91C1C;
          --light-red: #FEE2E2;
          --gray-dark: #1F2937;
          --gray-medium: #6B7280;
          --gray-light: #D1D5DB;
        }

        /* Performance optimizations */
        .related-card,
        .btn-add-to-cart,
        .action-btn {
          will-change: transform;
        }

        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .related-card,
          .btn-add-to-cart,
          .action-btn,
          .badge.limited {
            animation: none;
          }
          
          .related-card:hover,
          .btn-add-to-cart:hover,
          .action-btn:hover {
            transform: none;
          }
        }

        /* Focus states */
        .btn-add-to-cart:focus,
        .action-btn:focus,
        .tab-btn:focus,
        .btn-view:focus,
        .btn-back:focus {
          outline: 2px solid var(--primary-red);
          outline-offset: 2px;
        }
            `}</style>
    </div>
  );
};

export default PaletteDetails;