import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
    ArrowLeft,
    Smartphone,
    Building2,
    Bitcoin,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
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
        country: ''
    });
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // ⚠️ REMPLACEZ CES VALEURS PAR VOS VRAIS IDs EmailJS
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'XVJ80xmr1Da-gAINk',        // Ex: user_abc123def456
        SERVICE_ID: 'service_sbjv2vr',        // Ex: service_xyz789
        TEMPLATE_CLIENT: 'template_fs59kpa', // Ex: template_client123
        TEMPLATE_ADMIN: 'template_bynug3g'   // Ex: template_admin456
    };

    // Initialiser EmailJS
    useEffect(() => {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('📧 EmailJS initialisé avec la clé:', EMAILJS_CONFIG.PUBLIC_KEY);
    }, []);

    // Charger le panier
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('plf_cart') || '[]');
        setCartItems(cart);
        console.log('🛒 Panier chargé:', cart);
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

    // Liste des pays
    const countries = [
        'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola', 'Antigua-et-Barbuda', 'Arabie saoudite', 'Argentine', 'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan',
        'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Bélarus', 'Belgique', 'Belize', 'Bénin', 'Bhoutan', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie', 'Burkina Faso', 'Burundi',
        'Cambodge', 'Cameroun', 'Canada', 'Cap-Vert', 'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Corée du Nord', 'Corée du Sud', 'Costa Rica', 'Côte d\'Ivoire', 'Croatie', 'Cuba',
        'Danemark', 'Djibouti', 'Dominique',
        'Égypte', 'Émirats arabes unis', 'Équateur', 'Érythrée', 'Espagne', 'Estonie', 'Eswatini', 'États-Unis', 'Éthiopie',
        'Fidji', 'Finlande', 'France',
        'Gabon', 'Gambie', 'Géorgie', 'Ghana', 'Grèce', 'Grenade', 'Guatemala', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale', 'Guyana',
        'Haïti', 'Honduras', 'Hongrie',
        'Îles Marshall', 'Îles Salomon', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Irlande', 'Islande', 'Israël', 'Italie',
        'Jamaïque', 'Japon', 'Jordanie',
        'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweït',
        'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Libéria', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg',
        'Macédoine du Nord', 'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Maroc', 'Maurice', 'Mauritanie', 'Mexique', 'Micronésie', 'Moldavie', 'Monaco', 'Mongolie', 'Monténégro', 'Mozambique', 'Myanmar',
        'Namibie', 'Nauru', 'Népal', 'Nicaragua', 'Niger', 'Nigeria', 'Norvège', 'Nouvelle-Zélande',
        'Oman', 'Ouganda', 'Ouzbékistan',
        'Pakistan', 'Palaos', 'Panama', 'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne', 'Portugal',
        'Qatar',
        'République centrafricaine', 'République démocratique du Congo', 'République dominicaine', 'République tchèque', 'Roumanie', 'Royaume-Uni', 'Russie', 'Rwanda',
        'Saint-Christophe-et-Niévès', 'Sainte-Lucie', 'Saint-Marin', 'Saint-Vincent-et-les-Grenadines', 'Salvador', 'Samoa', 'São Tomé-et-Príncipe', 'Sénégal', 'Serbie', 'Seychelles', 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Soudan du Sud', 'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Syrie',
        'Tadjikistan', 'Tanzanie', 'Tchad', 'Thaïlande', 'Timor oriental', 'Togo', 'Tonga', 'Trinité-et-Tobago', 'Tunisie', 'Turkménistan', 'Turquie', 'Tuvalu',
        'Ukraine', 'Uruguay',
        'Vanuatu', 'Vatican', 'Venezuela', 'Viêt Nam',
        'Yémen',
        'Zambie', 'Zimbabwe'
    ];


    // Fonction pour envoyer les emails
    const sendOrderEmails = async (orderNumber) => {

        const orderDate = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        try {
            console.log('📧 Début envoi des emails...');

            // Préparer les données communes
            const customerFullName = `${customerInfo.firstName} ${customerInfo.lastName}`;
            const customerFullAddress = `${customerInfo.address}, ${customerInfo.zipCode} ${customerInfo.city}, ${customerInfo.country}`;
            const paymentMethodName = paymentMethods.find(m => m.id === selectedPayment)?.name || selectedPayment;
            const cartItemsText = cartItems.map(item =>
                `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`
            ).join('\n');

            // 1. EMAIL CLIENT
            console.log('📧 Envoi email client vers:', customerInfo.email);
            const clientParams = {
                to_email: customerInfo.email,
                customer_name: customerFullName,
                order_number: orderNumber,
                order_total: total.toFixed(2),
                payment_method: paymentMethodName,
                customer_address: customerFullAddress,
                order_date: orderDate,
            };

            console.log('📧 Paramètres client:', clientParams);

            const clientResult = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_CLIENT,
                clientParams
            );

            console.log('✅ Email client envoyé:', clientResult);

            // 2. EMAIL ADMIN
            console.log('📧 Envoi email admin...');
            const adminParams = {
                customer_name: customerFullName,
                customer_email: customerInfo.email,
                customer_phone: customerInfo.phone,
                customer_full_address: customerFullAddress,
                order_number: orderNumber,
                order_total: total.toFixed(2),
                payment_method: paymentMethodName,
                cart_items: cartItemsText,
                order_date: orderDate,
            };

            console.log('📧 Paramètres admin:', adminParams);

            const adminResult = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ADMIN,
                adminParams
            );

            console.log('✅ Email admin envoyé:', adminResult);
            console.log('✅ TOUS LES EMAILS ENVOYÉS AVEC SUCCÈS !');

            return {
                success: true,
                orderNumber,
                clientStatus: clientResult.status,
                adminStatus: adminResult.status
            };

        } catch (error) {
            console.error('❌ ERREUR envoi emails:', error);
            console.error('❌ Type d\'erreur:', error.name);
            console.error('❌ Message:', error.message);
            console.error('❌ Détails:', error.text || 'Pas de détails supplémentaires');

            // Même en cas d'erreur email, on continue le processus
            return {
                success: false,
                error: error.message,
                orderNumber
            };
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🚀 Début traitement commande...');

        // Validation
        if (!selectedPayment) {
            alert('Veuillez sélectionner une méthode de paiement');
            return;
        }

        if (cartItems.length === 0) {
            alert('Votre panier est vide');
            return;
        }

        setIsProcessing(true);

        try {
            // Générer le numéro de commande
            const orderNumber = `PLF-${Date.now()}`;
            console.log('📝 Numéro de commande:', orderNumber);

            // Envoyer les emails
            const emailResult = await sendOrderEmails(orderNumber);

            if (emailResult.success) {
                console.log('✅ Commande traitée avec succès - Emails envoyés');
            } else {
                console.log('⚠️ Commande traitée - Erreur emails:', emailResult.error);
                // On continue quand même le processus
            }

            // Finaliser la commande
            setOrderSubmitted(true);

            // Vider le panier
            localStorage.setItem('plf_cart', '[]');
            window.dispatchEvent(new Event('cart-updated'));

            console.log('🎉 Commande finalisée avec succès !');

        } catch (error) {
            console.error('❌ Erreur critique:', error);
            alert('Une erreur est survenue. Veuillez réessayer ou nous contacter.');
        } finally {
            setIsProcessing(false);
        }
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

    // Si commande validée, afficher la confirmation
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

    // Si panier vide
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
                        <form onSubmit={handleSubmit}>
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
                                            placeholder="votre@email.com"
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
                                            placeholder="Prénom"
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
                                            placeholder="Nom"
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
                                            placeholder="06 12 34 56 78"
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
                                            placeholder="123 Rue de la Paix"
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
                                            placeholder="Paris"
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
                                            placeholder="75001"
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Pays *</label>
                                        <select
                                            name="country"
                                            value={customerInfo.country}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Sélectionnez un pays</option>
                                            {countries.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
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
                            </div>

                            <button
                                type="submit"
                                className="btn-place-order"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="spinner"></span>
                                        Traitement en cours...
                                    </>
                                ) : (
                                    `Passer la commande - ${total.toFixed(2)}€`
                                )}
                            </button>
                        </form>
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

        .form-group select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    background: white;
    cursor: pointer;
    color: #6b7280;
}
.form-group select:focus {
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-place-order:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .btn-place-order:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
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
                            <div className="delivery-card">
                                <div className="customer-name">{customerInfo.firstName} {customerInfo.lastName}</div>
                                <div className="customer-address">
                                    <p>{customerInfo.address}</p>
                                    <p>{customerInfo.zipCode} {customerInfo.city}, {customerInfo.country}</p>
                                </div>
                                <div className="customer-contact">
                                    <p><strong>Email:</strong> {customerInfo.email}</p>
                                    <p><strong>Téléphone:</strong> {customerInfo.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="next-steps">
                            <h3>Prochaines étapes</h3>
                            <div className="steps-list">
                                <div className="step-item">
                                    <span className="step-number">1</span>
                                    <span>Vous recevrez un email de confirmation</span>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">2</span>
                                    <span>Un agent vous contactera pour finaliser le paiement</span>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">3</span>
                                    <span>Suivi de votre commande par email</span>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">4</span>
                                    <span>Livraison sous 48h après validation du paiement</span>
                                </div>
                            </div>
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
                    color: #dc2626;
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
                    display: grid;
                    gap: 30px;
                }
                .confirmation-details h3 {
                    color: #dc2626;
                    font-weight: 600;
                    margin-bottom: 20px;
                    font-size: 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .delivery-card {
                    background: #fef2f2;
                    border: 2px solid #dc2626;
                    border-radius: 12px;
                    padding: 25px;
                    margin-bottom: 20px;
                }
                .customer-name {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 15px;
                }
                .customer-address {
                    margin-bottom: 15px;
                }
                .customer-address p, .customer-contact p {
                    margin: 5px 0;
                    color: #374151;
                    line-height: 1.5;
                }
                .steps-list {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 20px;
                }
                .step-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 0;
                    color: #374151;
                    border-bottom: 1px solid #e5e7eb;
                }
                .step-item:last-child {
                    border-bottom: none;
                }
                .step-number {
                    background: #dc2626;
                    color: white;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 0.9rem;
                    flex-shrink: 0;
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