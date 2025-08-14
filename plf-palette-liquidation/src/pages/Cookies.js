import React from 'react';

const Cookies = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Politique des Cookies</h1>
        <p><strong>Dernière mise à jour :</strong> Août 2025</p>
        
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone) 
          lorsque vous visitez un site internet. Il permet au site de mémoriser vos préférences et 
          d'améliorer votre expérience de navigation.
        </p>

        <h2>2. Pourquoi utilisons-nous des cookies ?</h2>
        <p>
          PLF - Palette Liquidation France utilise des cookies pour :
        </p>
        <ul>
          <li>Assurer le bon fonctionnement du site</li>
          <li>Mémoriser votre panier d'achat</li>
          <li>Améliorer votre expérience utilisateur</li>
          <li>Analyser l'utilisation du site</li>
          <li>Personnaliser le contenu affiché</li>
        </ul>

        <h2>3. Types de cookies utilisés</h2>
        
        <h3>3.1 Cookies strictement nécessaires</h3>
        <p>
          Ces cookies sont indispensables au fonctionnement du site. 
          <strong>Ils ne nécessitent pas votre consentement.</strong>
        </p>
        
        <div className="cookie-table">
          <table>
            <thead>
              <tr>
                <th>Nom du cookie</th>
                <th>Finalité</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>plf_cart</td>
                <td>Mémorisation du contenu de votre panier</td>
                <td>Session + 7 jours</td>
              </tr>
              <tr>
                <td>session_id</td>
                <td>Identification de votre session</td>
                <td>Session</td>
              </tr>
              <tr>
                <td>csrf_token</td>
                <td>Protection contre les attaques CSRF</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.2 Cookies de performance et d'analyse</h3>
        <p>
          Ces cookies nous aident à comprendre comment vous utilisez le site. 
          <strong>Votre consentement est requis.</strong>
        </p>
        
        <div className="cookie-table">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Finalité</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Analytics</td>
                <td>Analyse du trafic et du comportement des visiteurs</td>
                <td>24 mois</td>
              </tr>
              <tr>
                <td>Hotjar</td>
                <td>Analyse de l'expérience utilisateur (heatmaps)</td>
                <td>12 mois</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.3 Cookies de fonctionnalités</h3>
        <p>
          Ces cookies améliorent les fonctionnalités et la personnalisation du site. 
          <strong>Votre consentement est requis.</strong>
        </p>
        
        <div className="cookie-table">
          <table>
            <thead>
              <tr>
                <th>Nom du cookie</th>
                <th>Finalité</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>user_preferences</td>
                <td>Mémorisation de vos préférences (langue, devise)</td>
                <td>12 mois</td>
              </tr>
              <tr>
                <td>viewed_products</td>
                <td>Mémorisation des produits consultés</td>
                <td>30 jours</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.4 Cookies publicitaires</h3>
        <p>
          <strong>PLF n'utilise actuellement aucun cookie publicitaire.</strong> 
          Si cela venait à changer, nous vous en informerions et demanderions votre consentement.
        </p>

        <h2>4. Cookies tiers</h2>
        <p>Certains cookies peuvent être déposés par des services tiers :</p>
        <ul>
          <li><strong>EmailJS :</strong> Pour l'envoi d'emails de confirmation</li>
          <li><strong>Hébergeur :</strong> Pour la sécurité et la performance du site</li>
          <li><strong>CDN :</strong> Pour l'optimisation du chargement des ressources</li>
        </ul>
        <p>
          Ces services ont leur propre politique de cookies que nous vous invitons à consulter.
        </p>

        <h2>5. Stockage local (LocalStorage)</h2>
        <p>
          En plus des cookies, nous utilisons le stockage local de votre navigateur pour :
        </p>
        <ul>
          <li><strong>plf_cart :</strong> Sauvegarde de votre panier entre les sessions</li>
          <li><strong>user_settings :</strong> Préférences d'affichage du site</li>
        </ul>
        <p>
          Ces données restent sur votre appareil et ne sont pas transmises à nos serveurs 
          sauf lors du processus de commande.
        </p>

        <h2>6. Gestion de vos préférences</h2>
        
        <h3>6.1 Paramètres du navigateur</h3>
        <p>Vous pouvez configurer votre navigateur pour :</p>
        <ul>
          <li>Bloquer tous les cookies</li>
          <li>Accepter seulement les cookies de notre site</li>
          <li>Vous demander avant d'accepter chaque cookie</li>
          <li>Supprimer les cookies existants</li>
        </ul>

        <h3>6.2 Instructions par navigateur</h3>
        <ul>
          <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
          <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
          <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
          <li><strong>Edge :</strong> Paramètres → Confidentialité → Cookies</li>
        </ul>

        <h3>6.3 Outils de gestion</h3>
        <p>Vous pouvez également utiliser des outils externes :</p>
        <ul>
          <li><strong>Ghostery :</strong> Extension de blocage des trackers</li>
          <li><strong>uBlock Origin :</strong> Bloqueur de publicités et trackers</li>
          <li><strong>Privacy Badger :</strong> Protection contre le tracking</li>
        </ul>

        <h2>7. Conséquences du refus des cookies</h2>
        <p>
          Si vous désactivez les cookies, certaines fonctionnalités peuvent être affectées :
        </p>
        <ul>
          <li>Perte du contenu de votre panier</li>
          <li>Impossibilité de mémoriser vos préférences</li>
          <li>Expérience de navigation dégradée</li>
          <li>Nécessité de ressaisir vos informations</li>
        </ul>
        <p>
          <strong>Les cookies strictement nécessaires ne peuvent pas être désactivés</strong> 
          car ils sont indispensables au fonctionnement du site.
        </p>

        <h2>8. Durée de conservation</h2>
        <p>Les cookies sont conservés pour une durée maximale de :</p>
        <ul>
          <li><strong>Cookies de session :</strong> Jusqu'à la fermeture du navigateur</li>
          <li><strong>Cookies persistants :</strong> Maximum 24 mois</li>
          <li><strong>Cookies fonctionnels :</strong> 12 mois maximum</li>
        </ul>

        <h2>9. Mise à jour de cette politique</h2>
        <p>
          Cette politique peut être mise à jour pour refléter les changements dans 
          notre utilisation des cookies ou pour des raisons légales. 
          Nous vous informerons de tout changement significatif.
        </p>

        <h2>10. Vos droits</h2>
        <p>Conformément au RGPD, vous pouvez :</p>
        <ul>
          <li>Demander des informations sur les cookies utilisés</li>
          <li>Retirer votre consentement à tout moment</li>
          <li>Vous opposer à certains cookies</li>
          <li>Demander la suppression des données collectées via cookies</li>
        </ul>

        <h2>11. Contact</h2>
        <p>
          Pour toute question concernant notre utilisation des cookies :
        </p>
        <ul>
          <li><strong>Email :</strong> liquidation.palette@gmail.com</li>
          <li><strong>Téléphone :</strong> +33 7 56 86 75 16</li>
          <li><strong>Adresse :</strong> 281 Rue Blanche SELVA, 66000 Perpignan, France</li>
        </ul>

        <h2>12. Liens utiles</h2>
        <ul>
          <li><a href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi" target="_blank">CNIL - Cookies et traceurs</a></li>
          <li><a href="https://www.allaboutcookies.org/fr/" target="_blank">Tout sur les cookies</a></li>
          <li><a href="/legal/privacy">Notre Politique de Confidentialité</a></li>
        </ul>
      </div>
      
      <style jsx>{`
        .legal-page {
          padding: 120px 0 80px;
          min-height: 100vh;
          background: #f8fafc;
        }
        h1 {
          color: #dc2626;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 30px;
          border-bottom: 3px solid #dc2626;
          padding-bottom: 15px;
        }
        h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        h3 {
          color: #374151;
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        p {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        ul {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 15px;
          padding-left: 20px;
        }
        li {
          margin-bottom: 8px;
        }
        a {
          color: #dc2626;
          text-decoration: underline;
        }
        strong {
          color: #1e293b;
        }
        .cookie-table {
          margin: 20px 0;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: #f8fafc;
          border-radius: 8px;
          overflow: hidden;
        }
        th {
          background: #dc2626;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        tbody tr:last-child td {
          border-bottom: none;
        }
        tbody tr:nth-child(even) {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default Cookies;