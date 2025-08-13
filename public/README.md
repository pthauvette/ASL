# Site Web Armateurs du Saint-Laurent - Version HTML

Ce dossier contient la version HTML statique du site web de l'Association des Armateurs du Saint-Laurent, optimisée pour un déploiement facile par FTP.

## 📁 Structure du site

```
public/
├── index.html              # Page d'accueil
├── association.html        # Page de l'association
├── contact.html            # Page de contact
├── membres.html            # Page des membres
├── evenements.html         # Page des événements (à créer)
├── saint-laurent.html      # Page du Saint-Laurent (à créer)
├── dossiers.html           # Page des dossiers (à créer)
├── connexion.html          # Page de connexion (à créer)
├── inscription.html        # Page d'inscription (à créer)
├── politique-confidentialite.html  # Politique de confidentialité (à créer)
├── conditions-utilisation.html     # Conditions d'utilisation (à créer)
├── plan-site.html          # Plan du site (à créer)
├── styles/
│   └── main.css           # Feuille de style principale
├── scripts/
│   └── main.js            # JavaScript principal
├── images/                # Dossier pour les images locales (optionnel)
└── README.md             # Ce fichier
```

## 🚀 Déploiement

### Option 1: Déploiement par FTP
1. Connectez-vous à votre serveur FTP
2. Naviguez vers le dossier racine de votre site (souvent `public_html` ou `www`)
3. Uploadez tous les fichiers du dossier `public/` vers la racine de votre site
4. Assurez-vous que `index.html` est dans la racine
5. Vérifiez les permissions (644 pour les fichiers, 755 pour les dossiers)

### Option 2: Hébergement web simple
Le site peut être hébergé sur n'importe quel service d'hébergement web supportant les fichiers HTML statiques:
- GitHub Pages
- Netlify
- Vercel
- OVH
- 1&1 IONOS
- Tout autre hébergeur web

## 🎨 Fonctionnalités

### Pages créées
- ✅ **Page d'accueil** (`index.html`) - Présentation générale avec hero, services, stats, actualités
- ✅ **L'Association** (`association.html`) - Mission, histoire, conseil d'administration, valeurs
- ✅ **Contact** (`contact.html`) - Coordonnées, formulaire de contact, carte, équipe
- ✅ **Nos Membres** (`membres.html`) - Aperçu des membres, catégories, témoignages

### Pages à créer
- ⏳ **Événements** (`evenements.html`) - Calendrier des événements, inscriptions
- ⏳ **Le Saint-Laurent** (`saint-laurent.html`) - Information sur la voie maritime
- ⏳ **Dossiers** (`dossiers.html`) - Dossiers sectoriels et documents
- ⏳ **Connexion** (`connexion.html`) - Formulaire de connexion membres
- ⏳ **Inscription** (`inscription.html`) - Formulaire d'adhésion
- ⏳ **Pages légales** - Politique de confidentialité, conditions d'utilisation, plan du site

### Fonctionnalités techniques
- 📱 **Design responsive** - Adapté mobile, tablette et desktop
- 🎯 **Navigation intuitive** - Menu principal avec états actifs
- 🚀 **Performance optimisée** - CSS et JS minifiés, images optimisées
- ♿ **Accessibilité** - Sémantique HTML5, contrastes conformes, navigation clavier
- 🔍 **SEO-friendly** - Meta descriptions, structure sémantique, URL propres
- 🎨 **Animations fluides** - Transitions CSS, défilement doux
- 📊 **Formulaires interactifs** - Validation côté client, notifications

## 🛠 Personnalisation

### Couleurs et identité visuelle
Les couleurs principales sont définies dans `styles/main.css`:
```css
:root {
  --primary-color: #030213;          /* Bleu marine principal */
  --secondary-color: #f3f3f5;        /* Gris clair backgrounds */
  --accent-color: #e9ebef;           /* Gris accent */
  --destructive-color: #d4183d;      /* Rouge pour urgences/erreurs */
}
```

### Images
- Les images actuelles utilisent Unsplash pour la démonstration
- Remplacez les URLs `https://images.unsplash.com/...` par vos images locales
- Placez vos images dans le dossier `images/` et mettez à jour les liens

### Contenu
- Modifiez le contenu directement dans les fichiers HTML
- Mettez à jour les coordonnées dans `contact.html`
- Personnalisez les informations de l'association dans `association.html`

## 📞 Configuration du formulaire de contact

Le formulaire de contact dans `contact.html` nécessite un service backend pour fonctionner. Options recommandées:

### Option 1: Formspree (Recommandé)
1. Inscrivez-vous sur [formspree.io](https://formspree.io)
2. Remplacez `action="#"` par `action="https://formspree.io/f/VOTRE_ID"`

### Option 2: Netlify Forms
1. Ajoutez `netlify` à la balise `<form>`
2. Le formulaire sera automatiquement géré par Netlify

### Option 3: Script PHP personnalisé
Créez un fichier `contact.php` pour traiter les soumissions (nécessite un serveur PHP).

## 🔧 Maintenance et mises à jour

### Ajout de nouvelles pages
1. Dupliquez une page existante (ex: `association.html`)
2. Modifiez le contenu selon vos besoins
3. Mettez à jour la navigation dans `header` de toutes les pages
4. Ajoutez les liens appropriés dans le `footer`

### Optimisation des performances
- Compressez les images avant upload
- Minifiez le CSS et JS en production
- Activez la compression GZIP sur votre serveur
- Utilisez un CDN pour les ressources statiques

### SEO
- Mettez à jour les balises `<title>` et `<meta description>`
- Ajoutez des balises Open Graph pour les réseaux sociaux
- Créez un fichier `sitemap.xml`
- Configurez Google Analytics/Search Console

## 🌐 Compatibilité navigateurs

Le site est compatible avec:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Safari mobile (iOS 14+)
- ✅ Chrome mobile (Android 8+)

## 📝 Notes importantes

1. **Images Unsplash**: Remplacez toutes les images Unsplash par vos propres images
2. **Formulaires**: Les formulaires nécessitent un backend pour être fonctionnels
3. **Liens emails/téléphones**: Mettez à jour avec vos vraies coordonnées
4. **Liens sociaux**: Ajoutez vos vrais liens vers LinkedIn, Twitter, etc.
5. **Google Maps**: Remplacez le lien Google Maps par votre vraie adresse

## 🔗 Liens utiles

- [Unsplash](https://unsplash.com) - Images gratuites
- [Formspree](https://formspree.io) - Service de formulaires
- [Google Fonts](https://fonts.google.com) - Polices web
- [Can I Use](https://caniuse.com) - Compatibilité navigateurs
- [GTmetrix](https://gtmetrix.com) - Test de performance

## 📞 Support

Pour toute question technique concernant ce site HTML:

1. Vérifiez que tous les fichiers sont bien uploadés
2. Contrôlez les permissions des fichiers
3. Testez sur différents navigateurs
4. Validez le HTML sur [validator.w3.org](https://validator.w3.org)

---

**Version**: 1.0  
**Dernière mise à jour**: Décembre 2024  
**Créé pour**: Association des Armateurs du Saint-Laurent