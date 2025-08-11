import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Building,
  HelpCircle,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de l'envoi
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@plf-palettes.fr',
      subtitle: 'Réponse sous 24h',
      color: '#dc2626'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      subtitle: 'Lun-Ven 9h-18h',
      color: '#059669'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Paris, France',
      subtitle: 'Sur rendez-vous',
      color: '#7c3aed'
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: '9h - 18h',
      subtitle: 'Du lundi au vendredi',
      color: '#ea580c'
    }
  ];

  const faqItems = [
    {
      question: 'Comment puis-je passer une commande ?',
      answer: 'Parcourez nos palettes disponibles, sélectionnez celle qui vous intéresse et suivez le processus de commande. Nous vous accompagnons à chaque étape.'
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Nous expédions sous 48h après confirmation de votre commande. La livraison prend généralement 2-5 jours ouvrés selon votre localisation.'
    },
    {
      question: 'Puis-je visiter vos entrepôts ?',
      answer: 'Oui, les visites sont possibles sur rendez-vous. Contactez-nous pour planifier votre visite et voir nos palettes en personne.'
    },
    {
      question: 'Quelle est votre politique de retour ?',
      answer: 'Nous garantissons la qualité de nos palettes. En cas de problème, contactez-nous dans les 7 jours suivant la réception pour une solution rapide.'
    }
  ];

  const reasons = [
    {
      icon: MessageCircle,
      title: 'Questions sur nos palettes',
      description: 'Besoin d\'informations sur nos produits ou notre processus de sélection ?'
    },
    {
      icon: Building,
      title: 'Partenariats B2B',
      description: 'Intéressé par un partenariat ou des achats en volume ?'
    },
    {
      icon: HelpCircle,
      title: 'Support technique',
      description: 'Problème avec votre commande ou besoin d\'assistance ?'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Contactez-nous</h1>
            <p>
              Notre équipe est là pour répondre à toutes vos questions et vous accompagner
              dans votre projet d'achat de palettes de liquidation.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">24h</span>
                <span className="stat-label">Temps de réponse</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction client</span>
              </div>
              <div className="stat">
                <span className="stat-number">7j/7</span>
                <span className="stat-label">Support disponible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="contact-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="contact-icon" style={{ backgroundColor: info.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>{info.title}</h3>
                    <p className="contact-value">{info.value}</p>
                    <p className="contact-subtitle">{info.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="form-section">
              <div className="form-header">
                <h2>Envoyez-nous un message</h2>
                <p>Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <User size={18} />
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        <Mail size={18} />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">
                      <Building size={18} />
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nom de votre entreprise (optionnel)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      <MessageCircle size={18} />
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="general">Question générale</option>
                      <option value="order">Commande/Livraison</option>
                      <option value="partnership">Partenariat</option>
                      <option value="technical">Support technique</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <Send size={18} />
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    <Send size={20} />
                    Envoyer le message
                  </button>
                </form>
              ) : (
                <div className="success-message">
                  <CheckCircle size={60} />
                  <h3>Message envoyé !</h3>
                  <p>Merci pour votre message. Nous vous répondrons dans les 24 heures.</p>
                </div>
              )}
            </div>

            {/* Why Contact Us */}
            <div className="reasons-section">
              <h3>Pourquoi nous contacter ?</h3>
              <div className="reasons-list">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <div
                      key={index}
                      className="reason-item"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="reason-icon">
                        <Icon size={24} />
                      </div>
                      <div className="reason-content">
                        <h4>{reason.title}</h4>
                        <p>{reason.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Suivez-nous</h4>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link instagram">
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link twitter">
                    <Twitter size={20} />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Questions Fréquentes</h2>
            <p>Trouvez rapidement les réponses à vos questions les plus courantes</p>
          </div>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="faq-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="faq-question">
                  <HelpCircle size={20} />
                  <h4>{item.question}</h4>
                </div>
                <p className="faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="faq-cta">
            <p>Vous ne trouvez pas la réponse à votre question ?</p>
            <button className="btn-secondary">
              Contactez-nous directement
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à découvrir nos palettes ?</h2>
            <p>Parcourez notre sélection de palettes de liquidation et trouvez les opportunités qui vous correspondent.</p>
            <button className="btn-primary">
              Voir les palettes disponibles
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
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
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .hero-content p {
          font-size: 1.25rem;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Contact Info Section */
        .contact-info-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
        }

        .contact-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(20px);
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
        }

        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .contact-details h3 {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .contact-value {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 5px;
          font-size: 1.1rem;
        }

        .contact-subtitle {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Main Contact Section */
        .main-contact-section {
          padding: 100px 0;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 80px;
          align-items: flex-start;
        }

        /* Form Section */
        .form-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-header h2 {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .form-header p {
          color: #64748b;
          line-height: 1.6;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          color: #374151;
          font-weight: 500;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-group label svg {
          color: #dc2626;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 15px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 18px 30px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
        }

        .success-message {
          text-align: center;
          padding: 60px 30px;
          color: #059669;
        }

        .success-message svg {
          margin-bottom: 20px;
        }

        .success-message h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #059669;
        }

        .success-message p {
          color: #64748b;
          line-height: 1.6;
        }

        /* Reasons Section */
        .reasons-section {
          background: #f8fafc;
          padding: 40px;
          border-radius: 20px;
          height: fit-content;
        }

        .reasons-section h3 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .reasons-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 40px;
        }

        .reason-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          transform: translateX(30px);
          opacity: 0;
          animation: slideLeft 0.8s ease-out forwards;
        }

        .reason-icon {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reason-content h4 {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .reason-content p {
          color: #64748b;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        @keyframes slideLeft {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Social Section */
        .social-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 30px;
        }

        .social-section h4 {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: white;
          border-radius: 10px;
          text-decoration: none;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .social-link.facebook:hover {
          color: #1877f2;
          border-left: 3px solid #1877f2;
        }

        .social-link.instagram:hover {
          color: #e4405f;
          border-left: 3px solid #e4405f;
        }

        .social-link.twitter:hover {
          color: #1da1f2;
          border-left: 3px solid #1da1f2;
        }

        /* FAQ Section */
        .faq-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .section-header p {
          color: #64748b;
          font-size: 1.2rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .faq-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(20px);
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }

        .faq-question {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 15px;
        }

        .faq-question svg {
          color: #dc2626;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .faq-question h4 {
          color: #1e293b;
          font-weight: 600;
          line-height: 1.4;
          margin: 0;
        }

        .faq-answer {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
          padding-left: 35px;
        }

        .faq-cta {
          text-align: center;
        }

        .faq-cta p {
          color: #64748b;
          margin-bottom: 25px;
          font-size: 1.1rem;
        }

        .btn-secondary {
          background: white;
          color: #dc2626;
          border: 2px solid #dc2626;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-2px);
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
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 18px 35px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(220, 38, 38, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-stats {
            gap: 30px;
          }

          .contact-layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;