import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Star,
  ArrowRight,
  Package,
  Eye,
  ShoppingCart,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import { getAvailablePalettes } from '../data/palettes';

const PaletteCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [palettesPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});

  const allPalettes = getAvailablePalettes();

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

  // Filtrage et tri des palettes
  const filteredPalettes = allPalettes.filter(palette => {
    const matchesSearch = palette.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      palette.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || palette.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedPalettes = [...filteredPalettes].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'profit':
        return parseInt(b.estimatedProfit) - parseInt(a.estimatedProfit);
      case 'quantity':
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastPalette = currentPage * palettesPerPage;
  const indexOfFirstPalette = indexOfLastPalette - palettesPerPage;
  const currentPalettes = sortedPalettes.slice(indexOfFirstPalette, indexOfLastPalette);
  const totalPages = Math.ceil(sortedPalettes.length / palettesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filterBy]);

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'electronics', label: 'Électronique' },
    { value: 'fashion', label: 'Mode & Vêtements' },
    { value: 'home', label: 'Maison & Jardin' },
    { value: 'sports', label: 'Sport & Loisirs' },
    { value: 'beauty', label: 'Beauté & Santé' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Mis en avant' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'profit', label: 'Profit estimé' },
    { value: 'quantity', label: 'Quantité' }
  ];

  return (
    <div className="palettes-page">
      {/* Header Section */}
      <section className="page-header" id="header">
        <div className="header-background">
          <div className="header-overlay"></div>
        </div>
        <div className="container">
          <div className="header-content">
            <h1>Nos Palettes</h1>
            <p>Découvrez notre collection complète de palettes de liquidation premium</p>
            <div className="header-stats">
              <div className="header-stat">
                <span className="stat-number">{allPalettes.length}</span>
                <span className="stat-label">Palettes disponibles</span>
              </div>
              <div className="header-stat">
                <span className="stat-number">48h</span>
                <span className="stat-label">Livraison rapide</span>
              </div>
              <div className="header-stat">
                <span className="stat-number">300%</span>
                <span className="stat-label">Profit moyen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className={`filters-section ${visibleSections.filters ? 'visible' : ''}`} id="filters">
        <div className="container">
          <div className="filters-container">
            <div className="search-container">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une palette..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filters-controls">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="results-info">
            <p>{filteredPalettes.length} palette{filteredPalettes.length > 1 ? 's' : ''} trouvée{filteredPalettes.length > 1 ? 's' : ''}</p>
          </div>
        </div>
      </section>

      {/* Palettes Section */}
      <section className={`palettes-section ${visibleSections.palettes ? 'visible' : ''}`} id="palettes">
        <div className="container">
          {currentPalettes.length === 0 ? (
            <div className="no-results">
              <Package size={64} />
              <h3>Aucune palette trouvée</h3>
              <p>Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className={`palettes-grid ${viewMode}`}>
              {currentPalettes.map((palette, index) => (
                <div
                  key={palette.id}
                  className="palette-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="palette-image">
                    <img src={palette.images[0]} alt={palette.title} />
                    <div className="palette-badges">
                      {palette.featured && <span className="badge featured">⭐ Vedette</span>}
                      <span className="badge grade">{palette.condition}</span>
                      {palette.limitedTime && <span className="badge limited">⏰ Limité</span>}
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
                      <div className="info-item">
                        <Star size={16} />
                        <span>{palette.rating}/5</span>
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
          )}
        </div>
      </section>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <section className="pagination-section" id="pagination">
          <div className="container">
            <div className="pagination">
              <button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
                Précédent
              </button>

              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 3 ||
                    pageNumber === currentPage + 3
                  ) {
                    return <span key={pageNumber} className="pagination-dots">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="pagination-info">
              <p>
                Page {currentPage} sur {totalPages}
              </p>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .palettes-page {
          overflow-x: hidden;
        }

        /* Page Header */
        .page-header {
  padding: 4rem 0;
  background: linear-gradient(
            135deg,
            rgba(244, 7, 7, 0.8) 0%,
            rgba(172, 4, 4, 0.6) 50%,
            rgba(82, 4, 4, 0.7) 100%
          );
  text-align: center;
}

        .header-content {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: headerSlideUp 1s ease-out;
        }

.header-content h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: white;
}

.header-content p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  color: var(--gray-medium);
}.header-content h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: white;
}

.header-content p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  color: white;
}


        .header-stat {
          text-align: center;
        }

        .header-stat .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .header-stat .stat-label {
          font-size: 1rem;
          opacity: 0.8;
        }

        /* Filters Section */
        .filters-section {
          padding: 3rem 0 2rem 0;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .filters-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .filters-container {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .search-container {
          flex: 1;
          min-width: 300px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          color: var(--gray-medium);
          z-index: 2;
        }

        .search-box input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 50px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--primary-red);
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .filters-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--primary-red);
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .view-toggle {
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
          background: white;
        }

        .view-btn {
          padding: 0.75rem;
          border: none;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-btn:hover {
          background: #f1f5f9;
        }

        .view-btn.active {
          background: var(--primary-red);
          color: white;
        }

        .results-info {
          text-align: center;
        }

        .results-info p {
          color: var(--gray-medium);
          font-size: 1rem;
        }

        /* Palettes Section */
.palettes-section {
  padding: 4rem 0;
  background: white;
  opacity: 1; /* Changer de 0 à 1 */
  transform: translateY(0); /* Changer de 50px à 0 */
  transition: all 0.8s ease;
  min-height: 60vh;
}

        .palettes-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .palettes-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .palettes-grid.grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }

        .palettes-grid.list {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .palettes-grid.list .palette-card {
          display: flex;
          align-items: stretch;
          height: 280px;
        }

        .palettes-grid.list .palette-image {
          width: 300px;
          height: 100%;
          flex-shrink: 0;
        }

        .palettes-grid.list .palette-content {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          flex-direction: column;
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
          width: fit-content;
        }

        .badge.featured {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
        }

        .badge.grade {
          color: var(--primary-red);
        }

        .badge.limited {
          background: linear-gradient(135deg, #EA580C, #DC2626);
          color: white;
          animation: pulse 2s infinite;
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
          flex-wrap: wrap;
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
          flex-wrap: wrap;
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
          margin-top: auto;
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

        /* No Results */
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--gray-medium);
        }

        .no-results svg {
          color: var(--gray-light);
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--gray-dark);
        }

        /* Pagination Section */
        .pagination-section {
          padding: 3rem 0;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          color: var(--gray-dark);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-btn:hover:not(.disabled) {
          background: var(--primary-red);
          color: white;
          border-color: var(--primary-red);
          transform: translateY(-2px);
        }

        .pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-numbers {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pagination-number {
          width: 45px;
          height: 45px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: var(--gray-dark);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-number:hover {
          background: var(--light-red);
          border-color: var(--primary-red);
          color: var(--primary-red);
        }

        .pagination-number.active {
          background: var(--primary-red);
          border-color: var(--primary-red);
          color: white;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .pagination-dots {
          color: var(--gray-medium);
          font-weight: 600;
          padding: 0 0.5rem;
        }

        .pagination-info {
          text-align: center;
        }

        .pagination-info p {
          color: var(--gray-medium);
          font-size: 0.95rem;
        }

        /* Animations */
        @keyframes headerSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .header-content h1 {
            font-size: 3rem;
          }

          .header-stats {
            gap: 2rem;
          }

          .palettes-grid.grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .filters-container {
            flex-direction: column;
            gap: 1.5rem;
            align-items: stretch;
          }

          .search-container {
            min-width: auto;
          }

          .filters-controls {
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .page-header {
            height: 50vh;
          }

          .header-content h1 {
            font-size: 2.5rem;
          }

          .header-content p {
            font-size: 1.1rem;
            padding: 0 1rem;
          }

          .header-stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .filters-container {
            gap: 1rem;
          }

          .filters-controls {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .view-toggle {
            align-self: center;
          }

          .palettes-grid.grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .palettes-grid.list .palette-card {
            flex-direction: column;
            height: auto;
          }

          .palettes-grid.list .palette-image {
            width: 100%;
            height: 200px;
          }

          .palettes-grid.list .palette-content {
            padding: 1.5rem;
          }

          .pagination {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .pagination-numbers {
            order: -1;
            width: 100%;
            justify-content: center;
            margin-bottom: 1rem;
          }

          .pagination-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .pagination-number {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .header-content h1 {
            font-size: 2rem;
          }

          .header-content p {
            font-size: 1rem;
          }

          .palette-card {
            margin: 0 0.5rem;
          }

          .palette-info {
            flex-direction: column;
            gap: 0.75rem;
          }

          .palette-price {
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .filters-controls {
            gap: 0.75rem;
          }

          .search-box input {
            font-size: 0.9rem;
          }

          .pagination-numbers {
            gap: 0.25rem;
          }

          .pagination-number {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }
        }

        /* Performance optimizations */
        .palette-card,
        .pagination-btn,
        .view-btn {
          will-change: transform;
        }

        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .palette-card,
          .pagination-btn,
          .view-btn,
          .badge.limited {
            animation: none;
          }
          
          .palette-card:hover,
          .pagination-btn:hover,
          .btn-overlay:hover {
            transform: none;
          }
        }

        /* Focus states pour l'accessibilité */
        .btn-add-cart:focus,
        .btn-details:focus,
        .btn-overlay:focus,
        .pagination-btn:focus,
        .pagination-number:focus,
        .view-btn:focus {
          outline: 2px solid var(--primary-red);
          outline-offset: 2px;
        }

        /* Variables CSS pour cohérence */
        :root {
          --primary-red: #DC2626;
          --dark-red: #B91C1C;
          --light-red: #FEE2E2;
          --gray-dark: #1F2937;
          --gray-medium: #6B7280;
          --gray-light: #D1D5DB;
        }

        /* Styles supplémentaires pour les animations d'entrée */
        .palette-card:nth-child(1) { animation-delay: 0.1s; }
        .palette-card:nth-child(2) { animation-delay: 0.2s; }
        .palette-card:nth-child(3) { animation-delay: 0.3s; }
        .palette-card:nth-child(4) { animation-delay: 0.4s; }
        .palette-card:nth-child(5) { animation-delay: 0.5s; }
        .palette-card:nth-child(6) { animation-delay: 0.6s; }
        .palette-card:nth-child(7) { animation-delay: 0.7s; }
        .palette-card:nth-child(8) { animation-delay: 0.8s; }
        .palette-card:nth-child(9) { animation-delay: 0.9s; }

        /* Amélioration de l'expérience de chargement */
        .palettes-grid.loading .palette-card {
          opacity: 0.6;
          pointer-events: none;
        }

        .palettes-grid.loading .palette-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
            `}</style>
    </div>
  );
};

export default PaletteCatalog;