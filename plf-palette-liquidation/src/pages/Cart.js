import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Package,
  CreditCard,
  Truck,
  Shield,
  Tag,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(null);

  // Charger le panier depuis localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('plf_cart') || '[]');
    setCartItems(savedCart);
  }, []);

  // Sauvegarder le panier dans localStorage
  const saveCart = (items) => {
    localStorage.setItem('plf_cart', JSON.stringify(items));
    setCartItems(items);
    // Notify header to update cart count
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Mettre à jour la quantité
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedItems);
  };

  // Supprimer un article
  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    saveCart(updatedItems);
    setShowRemoveModal(null);
  };

  // Vider le panier
  const clearCart = () => {
    saveCart([]);
  };

  // Appliquer un code promo
  const applyPromoCode = () => {
    const validCodes = {
      'BIENVENUE10': { discount: 10, type: 'percentage' },
      'PLF20': { discount: 20, type: 'percentage' },
      'FIRST50': { discount: 50, type: 'fixed' }
    };

    if (validCodes[promoCode]) {
      setPromoApplied({
        code: promoCode,
        ...validCodes[promoCode]
      });
    } else {
      setPromoApplied({ error: true });
    }
  };

  // Calculer les totaux
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Livraison gratuite au-dessus de 500€

  let discount = 0;
  if (promoApplied && !promoApplied.error) {
    discount = promoApplied.type === 'percentage'
      ? (subtotal * promoApplied.discount) / 100
      : promoApplied.discount;
  }

  const total = Math.max(0, subtotal + shipping - discount);




  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingCart size={80} />
            </div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos palettes de liquidation et trouvez des opportunités exceptionnelles !</p>
            <a href="/palettes" className="btn-primary">
              <Package size={20} />
              Voir nos palettes
            </a>
          </div>
        </div>
        <style jsx>{`
          .cart-page {
            padding: 120px 0 80px;
            min-height: 100vh;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .empty-cart {
            text-align: center;
            padding: 80px 20px;
          }
          .empty-cart-icon {
            color: #dc2626;
            margin-bottom: 30px;
          }
          .empty-cart h2 {
            color: #1e293b;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 15px;
          }
          .empty-cart p {
            color: #64748b;
            font-size: 1.1rem;
            margin-bottom: 30px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
          .btn-primary {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            transition: transform 0.3s ease;
          }
          .btn-primary:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <div className="header-left">
            <a href="/palettes" className="back-link">
              <ArrowLeft size={20} />
              Continuer mes achats
            </a>
            <h1>Mon Panier ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} articles)</h1>
          </div>
          <button onClick={clearCart} className="clear-cart-btn">
            <Trash2 size={18} />
            Vider le panier
          </button>
        </div>

        <div className="cart-layout">
          {/* Liste des articles */}
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="cart-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item-image">
                  <div className="image-placeholder">
                    <Package size={40} />
                  </div>
                  <div className="item-badge">{item.category}</div>
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-value">
                    <span className="original-value">Valeur d'origine : {item.originalValue}€</span>
                    <span className="savings">Économie : {item.originalValue - item.price}€</span>
                  </div>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-price">
                    <span className="unit-price">{item.price}€ / unité</span>
                    <span className="total-price">{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>

                  <button
                    onClick={() => setShowRemoveModal(item.id)}
                    className="remove-btn"
                    title="Supprimer cet article"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé de commande */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Résumé de la commande</h3>

              {/* Code promo */}
              <div className="promo-section">
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="promo-input"
                  />
                  <button onClick={applyPromoCode} className="promo-btn">
                    <Tag size={16} />
                  </button>
                </div>

                {promoApplied && (
                  <div className={`promo-message ${promoApplied.error ? 'error' : 'success'}`}>
                    {promoApplied.error ? (
                      <>
                        <AlertCircle size={16} />
                        Code promo invalide
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Code "{promoApplied.code}" appliqué !
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Détails des prix */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>

                {discount > 0 && (
                  <div className="price-row discount">
                    <span>Réduction</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}

                <div className="price-row">
                  <span>Livraison</span>
                  <span className={shipping === 0 ? 'free' : ''}>
                    {shipping === 0 ? 'Gratuite' : `${shipping}€`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="shipping-notice">
                    <Truck size={16} />
                    Livraison gratuite dès 500€ d'achat
                  </div>
                )}

                <div className="price-total">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Bouton de commande */}
              <button className="checkout-btn" onClick={() => window.location.href = '/checkout'}>
                <CreditCard size={20} />
                Passer la commande
              </button>

              {/* Garanties */}
              <div className="guarantees">
                <div className="guarantee-item">
                  <Shield size={16} />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="guarantee-item">
                  <Truck size={16} />
                  <span>Livraison rapide</span>
                </div>
                <div className="guarantee-item">
                  <Package size={16} />
                  <span>Qualité garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showRemoveModal && (
        <div className="modal-overlay" onClick={() => setShowRemoveModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Supprimer cet article ?</h3>
              <button
                onClick={() => setShowRemoveModal(null)}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>
            <p>Êtes-vous sûr de vouloir supprimer cet article de votre panier ?</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowRemoveModal(null)}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button
                onClick={() => removeItem(showRemoveModal)}
                className="btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cart-page {
          padding: 120px 0 80px;
          min-height: 100vh;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #dc2626;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          color: #b91c1c;
          transform: translateX(-5px);
        }

        .cart-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
        }

        .clear-cart-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .clear-cart-btn:hover {
          background: #dc2626;
        }

        /* Layout */
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
          align-items: flex-start;
        }

        /* Articles du panier */
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 25px;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-out forwards;
          transition: transform 0.3s ease;
        }

        .cart-item:hover {
          transform: translateY(-2px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .item-image {
          position: relative;
        }

        .image-placeholder {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .item-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #059669;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
        }

        .item-details h3 {
          color: #1e293b;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .item-description {
          color: #64748b;
          margin-bottom: 10px;
        }

        .item-value {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .original-value {
          color: #64748b;
          font-size: 0.9rem;
          text-decoration: line-through;
        }

        .savings {
          color: #059669;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Actions sur les articles */
        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 5px;
        }

        .qty-btn {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .qty-btn:hover:not(:disabled) {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
        }

        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity {
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }

        .item-price {
          text-align: right;
        }

        .unit-price {
          display: block;
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .total-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #dc2626;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        /* Résumé de commande */
        .order-summary {
          position: sticky;
          top: 100px;
        }

        .summary-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .summary-card h3 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 25px;
          text-align: center;
        }

        /* Code promo */
        .promo-section {
          margin-bottom: 25px;
        }

        .promo-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .promo-input {
          flex: 1;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: border-color 0.3s ease;
        }

        .promo-input:focus {
          outline: none;
          border-color: #dc2626;
        }

        .promo-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .promo-btn:hover {
          background: #b91c1c;
        }

        .promo-message {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
        }

        .promo-message.success {
          color: #059669;
          background: #ecfdf5;
        }

        .promo-message.error {
          color: #dc2626;
          background: #fef2f2;
        }

        /* Prix */
        .price-breakdown {
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
          margin-bottom: 25px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: #64748b;
        }

        .price-row.discount {
          color: #059669;
          font-weight: 600;
        }

        .price-row .free {
          color: #059669;
          font-weight: 600;
        }

        .shipping-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6366f1;
          font-size: 0.85rem;
          margin-bottom: 15px;
          padding: 8px;
          background: #f0f9ff;
          border-radius: 6px;
        }

        .price-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e293b;
          padding-top: 15px;
          border-top: 2px solid #dc2626;
        }

        /* Bouton de commande */
        .checkout-btn {
          width: 100%;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          margin-bottom: 25px;
        }

        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
        }

        /* Garanties */
        .guarantees {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .guarantee-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #64748b;
          font-size: 0.9rem;
        }

        .guarantee-item svg {
          color: #059669;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal {
          background: white;
          padding: 30px;
          border-radius: 15px;
          max-width: 400px;
          width: 90%;
          animation: slideIn 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .modal-header h3 {
          color: #1e293b;
          font-weight: 600;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
        }

        .modal p {
          color: #64748b;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #64748b;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-danger {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .cart-header {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .cart-header h1 {
            font-size: 2rem;
          }

          .cart-item {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }

          .item-actions {
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }

          .item-price {
            text-align: center;
          }

          .order-summary {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;