import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Smartphone,
    Building2,
    Bitcoin,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
    Copy,
} from 'lucide-react';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'France'
    });
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Charger le panier
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('plf_cart') || '[]');
        setCartItems(cart);
    }, []);

    // Calculer les totaux
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    // Informations des méthodes de paiement
    const paymentMethods = [
        {
            id: 'virement',
            name: 'Virement Bancaire',
            icon: Building2,
            description: 'Paiement sécurisé par virement',
            delay: '2-3 jours ouvrés',
            fee: 0,
            popular: false
        },
        {
            id: 'bitcoin',
            name: 'Bitcoin (BTC)',
            icon: Bitcoin,
            description: 'Paiement crypto instantané',
            delay: 'Immédiat après confirmation',
            fee: 0,
            popular: true
        },
        {
            id: 'applepay',
            name: 'Apple Pay',
            icon: Smartphone,
            description: 'Paiement rapide et sécurisé',
            delay: 'Instantané',
            fee: 0,
            popular: false
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPayment) {
            alert('Veuillez sélectionner une méthode de paiement');
            return;
        }

        setIsProcessing(true);

        // Simuler le traitement
        setTimeout(() => {
            setOrderSubmitted(true);
            setIsProcessing(false);

            // Vider le panier après commande
            localStorage.setItem('plf_cart', '[]');
            window.dispatchEvent(new Event('cart-updated'));
        }, 2000);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copié dans le presse-papiers !');
    };

    const goBack = () => {
        window.history.back();
    };

    const goToPalettes = () => {
        window.location.href = '/palettes';
    };

    const goHome = () => {
        window.location.href = '/';
    };

    if (orderSubmitted) {
        return (
            <OrderConfirmation
                paymentMethod={selectedPayment}
                orderTotal={total}
                customerInfo={customerInfo}
                goHome={goHome}
                goToPalettes={goToPalettes}
            />
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="checkout-empty">
                <div className="container">
                    <div className="empty-content">
                        <AlertCircle size={64} />
                        <h2>Votre panier est vide</h2>
                        <p>Ajoutez des palettes à votre panier avant de procéder au paiement</p>
                        <button onClick={goToPalettes} className="btn-primary">
                            Voir nos palettes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                {/* Header */}
                <div className="checkout-header">
                    <button onClick={goBack} className="back-link">
                        <ArrowLeft size={20} />
                        Retour au panier
                    </button>
                    <h1>Finaliser votre commande</h1>
                </div>

                <div className="checkout-layout">
                    {/* Formulaire principal */}
                    <div className="checkout-main">
                        <div onSubmit={handleSubmit}>
                            {/* Informations client */}
                            <div className="checkout-section">
                                <h3>Informations de livraison</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={customerInfo.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Prénom *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={customerInfo.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nom *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={customerInfo.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Téléphone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Adresse *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={customerInfo.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ville *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={customerInfo.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Code postal *</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={customerInfo.zipCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Méthodes de paiement */}
                            <div className="checkout-section">
                                <h3>Mode de paiement</h3>
                                <div className="payment-methods">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <div
                                                key={method.id}
                                                className={`payment-method ${selectedPayment === method.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedPayment(method.id)}
                                            >
                                                <div className="payment-header">
                                                    <div className="payment-info">
                                                        <Icon size={24} />
                                                        <div>
                                                            <h4>{method.name}</h4>
                                                            <p>{method.description}</p>
                                                        </div>
                                                    </div>
                                                    {method.popular && <span className="popular-badge">Populaire</span>}
                                                </div>
                                                <div className="payment-details">
                                                    <div className="payment-meta">
                                                        <span><Clock size={16} /> {method.delay}</span>
                                                        <span><Shield size={16} /> Sécurisé</span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value={method.id}
                                                    checked={selectedPayment === method.id}
                                                    onChange={(e) => setSelectedPayment(e.target.value)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Détails spécifiques par méthode */}
                                {selectedPayment === 'virement' && (
                                    <div className="payment-specific virement-details">
                                        <h4>Informations de virement</h4>
                                        <p>Après validation de votre commande, vous recevrez par email les coordonnées bancaires pour effectuer le virement.</p>
                                        <div className="warning">
                                            <AlertCircle size={16} />
                                            <span>Votre commande sera expédiée après réception du paiement (2-3 jours ouvrés)</span>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'bitcoin' && (
                                    <div className="payment-specific bitcoin-details">
                                        <h4>Paiement Bitcoin</h4>
                                        <p>Montant à payer: <strong>{total}€ = ~0.0234 BTC</strong> (taux en temps réel)</p>
                                        <div className="bitcoin-address">
                                            <label>Adresse Bitcoin:</label>
                                            <div className="address-field">
                                                <input
                                                    type="text"
                                                    value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')}
                                                >
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <CheckCircle size={16} />
                                            <span>Transaction confirmée automatiquement après 3 confirmations</span>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'applepay' && (
                                    <div className="payment-specific applepay-details">
                                        <h4>Apple Pay</h4>
                                        <p>Utilisez Touch ID ou Face ID pour payer en toute sécurité.</p>
                                        <div className="info">
                                            <CheckCircle size={16} />
                                            <span>Paiement instantané et sécurisé</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="btn-place-order"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Traitement...' : `Passer la commande - ${total}€`}
                            </button>
                        </div>
                    </div>

                    {/* Résumé commande */}
                    <div className="order-summary">
                        <div className="summary-card">
                            <h3>Récapitulatif</h3>

                            <div className="cart-items-summary">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>{(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-totals">
                                <div className="summary-row">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)}€</span>
                                </div>
                                <div className="summary-row">
                                    <span>Livraison</span>
                                    <span className={shipping === 0 ? 'free' : ''}>
                                        {shipping === 0 ? 'Gratuite' : `${shipping}€`}
                                    </span>
                                </div>
                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}€</span>
                                </div>
                            </div>

                            <div className="security-badges">
                                <div className="security-item">
                                    <Shield size={16} />
                                    <span>Paiement sécurisé SSL</span>
                                </div>
                                <div className="security-item">
                                    <CheckCircle size={16} />
                                    <span>Garantie satisfait</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .checkout-page {
          padding: 120px 0 80px;
          min-height: 100vh;
          background: #f8fafc;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .checkout-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }
        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #dc2626;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
        }
        .checkout-header h1 {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
        }
        .checkout-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
        }
        .checkout-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        .checkout-section h3 {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        .form-group label {
          display: block;
          color: #374151;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .form-group input:focus {
          outline: none;
          border-color: #dc2626;
        }
        .payment-methods {
          space-y: 12px;
        }
        .payment-method {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          margin-bottom: 12px;
        }
        .payment-method:hover {
          border-color: #dc2626;
        }
        .payment-method.selected {
          border-color: #dc2626;
          background: #fef2f2;
        }
        .payment-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .payment-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .payment-info h4 {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .payment-info p {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .popular-badge {
          background: #dc2626;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .payment-details {
          margin-top: 12px;
        }
        .payment-meta {
          display: flex;
          gap: 20px;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .payment-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .payment-method input[type="radio"] {
          position: absolute;
          top: 20px;
          right: 20px;
        }
        .payment-specific {
          margin-top: 20px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 8px;
        }
        .payment-specific h4 {
          color: #1e293b;
          margin-bottom: 12px;
        }
        .address-field {
          display: flex;
          gap: 8px;
        }
        .address-field input {
          flex: 1;
          font-family: monospace;
        }
        .address-field button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        .warning, .info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 12px;
          border-radius: 8px;
        }
        .warning {
          background: #fef3cd;
          color: #92400e;
        }
        .info {
          background: #dcfce7;
          color: #166534;
        }
        .btn-place-order {
          width: 100%;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .btn-place-order:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .btn-place-order:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .order-summary {
          height: fit-content;
        }
        .summary-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .summary-card h3 {
          color: #1e293b;
          margin-bottom: 20px;
        }
        .cart-items-summary {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: #6b7280;
        }
        .summary-totals {
          margin-bottom: 20px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: #6b7280;
        }
        .summary-row .free {
          color: #059669;
          font-weight: 600;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 2px solid #e5e7eb;
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e293b;
        }
        .security-badges {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
        .security-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #059669;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }
        .checkout-empty {
          padding: 120px 0 80px;
          min-height: 100vh;
        }
        .empty-content {
          text-align: center;
          padding: 80px 20px;
        }
        .empty-content h2 {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
          margin: 20px 0 15px;
        }
        .empty-content p {
          color: #64748b;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 15px 30px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
};

// Composant de confirmation de commande
const OrderConfirmation = ({ paymentMethod, orderTotal, customerInfo, goHome, goToPalettes }) => {
    const getPaymentInstructions = () => {
        switch (paymentMethod) {
            case 'virement':
                return (
                    <div className="payment-instructions virement">
                        <h3>Instructions pour le virement bancaire</h3>
                        <div className="bank-details">
                            <p><strong>Bénéficiaire:</strong> PLF - Palette Liquidation France</p>
                            <p><strong>IBAN:</strong> FR76 1751 2000 0012 3456 789</p>
                            <p><strong>BIC:</strong> PLFBFRPP</p>
                            <p><strong>Montant:</strong> {orderTotal}€</p>
                            <p><strong>Référence:</strong> CMD-{Date.now()}</p>
                        </div>
                        <div className="warning">
                            <AlertCircle size={16} />
                            <span>Votre commande sera expédiée après réception du virement (2-3 jours ouvrés)</span>
                        </div>
                    </div>
                );
            case 'bitcoin':
                return (
                    <div className="payment-instructions bitcoin">
                        <h3>Paiement Bitcoin en cours</h3>
                        <p>Nous surveillons la blockchain pour votre transaction.</p>
                        <div className="bitcoin-status">
                            <p><strong>Montant:</strong> ~0.0234 BTC</p>
                            <p><strong>Adresse:</strong> bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                            <div className="status-pending">
                                <Clock size={16} />
                                <span>En attente de confirmation (0/3)</span>
                            </div>
                        </div>
                    </div>
                );
            case 'applepay':
                return (
                    <div className="payment-instructions applepay">
                        <h3>Paiement Apple Pay confirmé</h3>
                        <div className="success">
                            <CheckCircle size={16} />
                            <span>Paiement de {orderTotal}€ traité avec succès</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="order-confirmation">
            <div className="container">
                <div className="confirmation-content">
                    <div className="success-icon">
                        <CheckCircle size={64} />
                    </div>
                    <h1>Commande confirmée !</h1>
                    <p className="order-number">Numéro de commande: <strong>PLF-{Date.now()}</strong></p>

                    <div className="confirmation-details">
                        <div className="customer-details">
                            <h3>Informations de livraison</h3>
                            <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                            <p>{customerInfo.address}</p>
                            <p>{customerInfo.zipCode} {customerInfo.city}</p>
                            <p>{customerInfo.email}</p>
                        </div>

                        {getPaymentInstructions()}

                        <div className="next-steps">
                            <h3>Prochaines étapes</h3>
                            <ul>
                                <li>Vous recevrez un email de confirmation</li>
                                <li>Suivi de votre commande par email</li>
                                <li>Livraison sous 48h après validation du paiement</li>
                            </ul>
                        </div>
                    </div>

                    <div className="confirmation-actions">
                        <button onClick={goToPalettes} className="btn-primary">
                            Continuer mes achats
                        </button>
                        <button onClick={goHome} className="btn-secondary">
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .order-confirmation {
          padding: 120px 0 80px;
          min-height: 100vh;
          background: #f8fafc;
        }
        .confirmation-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          background: white;
          padding: 60px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .success-icon {
          color: #059669;
          margin-bottom: 30px;
        }
        .confirmation-content h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }
        .order-number {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 40px;
        }
        .confirmation-details {
          text-align: left;
          margin: 40px 0;
        }
        .confirmation-details h3 {
          color: #1e293b;
          font-weight: 600;
          margin: 30px 0 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e5e7eb;
        }
        .payment-instructions {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .bank-details p {
          margin: 8px 0;
          color: #374151;
        }
        .bitcoin-status p {
          margin: 8px 0;
          font-family: monospace;
        }
        .status-pending, .success, .warning {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
        }
        .status-pending {
          background: #fef3cd;
          color: #92400e;
        }
        .success {
          background: #dcfce7;
          color: #166534;
        }
        .warning {
          background: #fef3cd;
          color: #92400e;
        }
        .next-steps ul {
          list-style: none;
          padding: 0;
        }
        .next-steps li {
          padding: 8px 0;
          color: #6b7280;
        }
        .next-steps li:before {
          content: "✓";
          color: #059669;
          font-weight: bold;
          margin-right: 10px;
        }
        .confirmation-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 40px;
        }
        .btn-primary, .btn-secondary {
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          transition: transform 0.3s;
          cursor: pointer;
          border: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
        }
        .btn-secondary {
          background: white;
          color: #dc2626;
          border: 2px solid #dc2626;
        }
        .btn-primary:hover, .btn-secondary:hover {
          transform: translateY(-2px);
        }
      `}</style>
        </div>
    );
};

export default Checkout;