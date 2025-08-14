import React from 'react';

const CGU = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Conditions Générales d'Utilisation</h1>
        <p><strong>Dernière mise à jour :</strong> Août 2025</p>
        
        <h2>1. Objet</h2>
        <p>
          Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du site internet 
          de PLF - Palette Liquidation France, accessible à l'adresse [votre-domaine.com].
        </p>
        <p>
          PLF est spécialisée dans la vente de palettes de liquidation provenant de grandes enseignes 
          et plateformes e-commerce.
        </p>

        <h2>2. Mentions légales</h2>
        <p><strong>Dénomination sociale :</strong> PLF - Palette Liquidation France</p>
        <p><strong>Adresse :</strong> 281 Rue Blanche SELVA, 66000 Perpignan, France</p>
        <p><strong>Email :</strong> liquidation.palette@gmail.com</p>
        <p><strong>Téléphone :</strong> +33 7 56 86 75 16</p>

        <h2>3. Accès au site</h2>
        <p>
          L'accès au site est gratuit et ouvert à tous les utilisateurs. PLF se réserve le droit 
          de suspendre temporairement l'accès au site pour maintenance ou mise à jour.
        </p>
        <p>
          L'utilisateur est responsable de son équipement informatique et de sa connexion internet.
        </p>

        <h2>4. Utilisation du site</h2>
        <p>L'utilisateur s'engage à :</p>
        <ul>
          <li>Utiliser le site conformément à sa destination</li>
          <li>Ne pas porter atteinte au bon fonctionnement du site</li>
          <li>Respecter les droits de propriété intellectuelle</li>
          <li>Ne pas diffuser de contenu illicite ou inapproprié</li>
          <li>Fournir des informations exactes lors des commandes</li>
        </ul>

        <h2>5. Propriété intellectuelle</h2>
        <p>
          Tous les éléments du site (textes, images, logos, design) sont protégés par les droits 
          de propriété intellectuelle et appartiennent à PLF ou à ses partenaires.
        </p>
        <p>
          Toute reproduction, représentation ou exploitation non autorisée est interdite.
        </p>

        <h2>6. Données personnelles</h2>
        <p>
          PLF collecte et traite les données personnelles conformément à sa 
          <a href="/legal/privacy"> Politique de Confidentialité</a>.
        </p>
        <p>
          Les données collectées sont nécessaires au traitement des commandes et à la 
          gestion de la relation client.
        </p>

        <h2>7. Responsabilité</h2>
        <p>
          PLF met tout en œuvre pour assurer le bon fonctionnement du site mais ne peut 
          garantir une disponibilité continue.
        </p>
        <p>
          PLF ne saurait être tenue responsable :
        </p>
        <ul>
          <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
          <li>Des interruptions de service</li>
          <li>Des virus ou programmes malveillants</li>
          <li>De la perte de données</li>
        </ul>

        <h2>8. Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. PLF n'est pas responsable 
          du contenu de ces sites externes.
        </p>

        <h2>9. Modification des CGU</h2>
        <p>
          PLF se réserve le droit de modifier les présentes CGU à tout moment. 
          Les modifications entrent en vigueur dès leur publication sur le site.
        </p>

        <h2>10. Droit applicable et juridiction</h2>
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige, 
          les tribunaux français seront seuls compétents.
        </p>

        <h2>11. Contact</h2>
        <p>
          Pour toute question relative aux CGU, vous pouvez nous contacter :
        </p>
        <ul>
          <li><strong>Email :</strong> liquidation.palette@gmail.com</li>
          <li><strong>Téléphone :</strong> +33 7 56 86 75 16</li>
          <li><strong>Adresse :</strong> 281 Rue Blanche SELVA, 66000 Perpignan, France</li>
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
      `}</style>
    </div>
  );
};

export default CGU;