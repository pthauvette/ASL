# Documentation ASL - Armateurs Saint-Laurent
## Version 3.0.0 - Design Optimisé selon le Croquis

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Améliorations apportées](#améliorations-apportées)
3. [Structure du projet](#structure-du-projet)
4. [Configuration et installation](#configuration-et-installation)
5. [API Membri 365](#api-membri-365)
6. [Composants UI](#composants-ui)
7. [Système d'animations](#système-danimations)
8. [Responsive Design](#responsive-design)
9. [Performance et optimisations](#performance-et-optimisations)
10. [Accessibilité](#accessibilité)
11. [Déploiement](#déploiement)
12. [Maintenance](#maintenance)

---

## 🎯 Vue d'ensemble

Le site des Armateurs Saint-Laurent a été entièrement refactorisé pour correspondre au design moderne présenté dans le croquis. Cette version 3.0.0 intègre les meilleures pratiques de développement web moderne, une architecture modulaire, et une intégration complète avec l'API Membri 365.

### Objectifs principaux
- ✅ Design moderne et professionnel correspondant au croquis
- ✅ Performance optimisée (Core Web Vitals)
- ✅ Accessibilité WCAG 2.1 AA
- ✅ Responsive design mobile-first
- ✅ Intégration API Membri 365
- ✅ Animations fluides et engageantes
- ✅ Architecture modulaire et maintenable

---

## 🚀 Améliorations apportées

### Design et UI/UX
- **Nouveau hero section** avec avatars interactifs et arrière-plan animé
- **Système de couleurs cohérent** basé sur les bleus maritimes
- **Typographie améliorée** avec Playfair Display pour les titres
- **Cartes redessinées** avec effets de brillance et hover
- **Animations subtiles** pour améliorer l'engagement
- **Section partenaires** avec logos organisés
- **Section conférence** mise en avant
- **Footer enrichi** avec newsletter intégrée

### Performance
- **Lazy loading** des images avec Intersection Observer
- **Service Worker** pour la mise en cache
- **Optimisation des animations** avec GPU acceleration
- **Bundle JavaScript optimisé** avec gestion d'erreurs
- **Préchargement des ressources critiques**
- **Compression et minification**

### Fonctionnalités
- **Carrousel de membres** avec navigation tactile
- **Système de notifications** toast avancé
- **Validation de formulaires** en temps réel
- **Mode offline** avec données de fallback
- **Gestion des cookies RGPD**
- **Analytics intégré**
- **Accessibilité clavier complète**

### Architecture
- **Code modulaire** avec séparation des responsabilités
- **Configuration centralisée** facilement modifiable
- **Gestion d'état** simplifiée
- **API manager** avec retry automatique et cache
- **Système de logging** configurable
- **Gestion d'erreurs** robuste

---

## 📁 Structure du projet

```
asl-website/
├── index.html              # Page principale optimisée
├── asl_custom.css          # Styles personnalisés selon le design
├── asl_main.js             # JavaScript principal modulaire
├── sw.js                   # Service Worker (à créer)
├── assets/
│   ├── images/             # Images optimisées
│   ├── icons/              # Icônes et favicons
│   └── fonts/              # Polices web
├── docs/
│   └── README.md           # Cette documentation
└── .env                    # Variables d'environnement
```

### Fichiers principaux

#### `index.html`
- Structure HTML5 sémantique
- Meta tags optimisés pour le SEO
- Preconnect pour les performances
- Accessibilité ARIA complète
- Scripts et styles optimisés

#### `asl_custom.css`
- Variables CSS custom properties
- Design system complet
- Animations CSS performantes
- Media queries mobile-first
- Support dark mode et reduced motion

#### `asl_main.js`
- Architecture modulaire ES6+
- Gestion d'état centralisée
- API manager avec cache
- Animations GSAP intégrées
- Gestionnaire d'erreurs

---

## ⚙️ Configuration et installation

### Prérequis
- Serveur web (Apache/Nginx)
- Support HTTPS (obligatoire pour Service Worker)
- Compte Membri 365 avec API key

### Installation locale

1. **Cloner les fichiers dans votre serveur web**
   ```bash
   # Copier les fichiers dans le dossier web
   cp -r asl-website/* /var/www/html/asl/
   ```

2. **Configurer les variables d'environnement**
   ```javascript
   // Dans index.html, définir l'ID organisation
   window.MEMBRI_ORG_ID = 'votre-org-id-membri365';
   ```

3. **Créer le Service Worker**
   ```javascript
   // sw.js
   const CACHE_NAME = 'asl-v3.0.0';
   const urlsToCache = [
     '/',
     '/asl_custom.css',
     '/asl_main.js',
     '/images/logo.png'
   ];

   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then((cache) => cache.addAll(urlsToCache))
     );
   });
   ```

4. **Configurer le serveur web**
   ```apache
   # .htaccess pour Apache
   <IfModule mod_headers.c>
     Header set X-Content-Type-Options nosniff
     Header set X-Frame-Options DENY
     Header set X-XSS-Protection "1; mode=block"
   </IfModule>

   # Compression gzip
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/css text/javascript application/javascript
   </IfModule>
   ```

### Configuration avancée

#### Mode debug
```javascript
// Dans asl_main.js
ASL_CONFIG.debug.enabled = true; // Activer en développement
ASL_CONFIG.debug.logLevel = 'debug'; // Niveau de log
```

#### Personnalisation des couleurs
```css
/* Dans asl_custom.css */
:root {
  --maritime-blue: #2563eb;
  --maritime-blue-dark: #1d4ed8;
  /* Modifier selon votre charte graphique */
}
```

---

## 🔌 API Membri 365

### Configuration

L'intégration avec Membri 365 est gérée par le module `APIManager` qui inclut :

- **Authentification automatique** avec token
- **Retry automatique** sur échec réseau
- **Cache intelligent** pour optimiser les performances
- **Gestion d'erreurs** robuste
- **Fallback** avec données de démonstration

### Endpoints utilisés

#### Membres
```javascript
// Récupérer la liste des membres
GET /v1/organizations/{orgId}/members
// Paramètres : page, limit

// Récupérer un membre spécifique
GET /v1/organizations/{orgId}/members/{memberId}
```

#### Événements
```javascript
// Récupérer les événements
GET /v1/organizations/{orgId}/events
// Paramètres : page, limit, status
```

#### Newsletter
```javascript
// Inscription newsletter
POST /v1/organizations/{orgId}/newsletter
// Body : { "email": "user@example.com" }
```

#### Adhésions
```javascript
// Soumettre une demande d'adhésion
POST /v1/organizations/{orgId}/memberships
// Body : formulaire complet
```

### Authentification

```javascript
// Initialiser avec token
APIManager.init('votre-token-api');

// Ou configurer automatiquement
localStorage.setItem('membri_token', 'votre-token');
```

### Gestion du cache

Le système de cache stocke automatiquement les réponses GET pendant 5 minutes :

```javascript
// Vider le cache manuellement
APIManager.clearCache();

// Désactiver le cache pour une requête
APIManager.makeRequest('endpoint', options, false);
```

### Données de fallback

En cas d'indisponibilité de l'API, le système utilise des données de démonstration pour maintenir la fonctionnalité du site.

---

## 🎨 Composants UI

### Structure modulaire

Le système UI est organisé en composants réutilisables :

#### Header avec navigation
- **Scroll effects** : transparence et auto-hide mobile
- **Menu mobile** responsive avec animations
- **Navigation fluide** avec offset pour header fixe

#### Carrousel de membres
- **Navigation tactile** et clavier
- **Responsive** : 4 desktop, 2 tablet, 1 mobile
- **Auto-play** avec pause au hover
- **Indicateurs visuels** de pagination

#### Système de notifications
- **Types multiples** : success, error, warning, info
- **Positionnement** intelligent
- **Auto-dismiss** configurable
- **Accessibilité** complète avec ARIA

#### Modales
- **Focus trapping** pour l'accessibilité
- **Fermeture** ESC et backdrop
- **Animations** d'entrée et sortie
- **Tailles configurables**

### Utilisation

```javascript
// Afficher une notification
UIComponents.showNotification('Message', 'success', 5000);

// Créer une modale
const modal = UIComponents.createModal(`
  <h2>Titre</h2>
  <p>Contenu</p>
`, { size: 'lg', closable: true });

// Naviguer dans le carrousel
document.getElementById('members-next').click();
```

---

## ✨ Système d'animations

### Technologies utilisées

- **GSAP** pour les animations complexes
- **CSS Transitions** pour les interactions
- **Intersection Observer** pour les animations au scroll
- **Web Animations API** en fallback

### Animations implémentées

#### Hero section
- **Stagger animation** des éléments avec délais
- **Parallax subtil** sur les éléments décoratifs
- **Hover effects** sur les avatars

#### Scroll animations
- **Fade in up** pour les sections
- **Stagger** pour les listes d'éléments
- **Counters animés** avec easing

#### Interactions
- **Hover lift** sur les cartes
- **Shine effect** au survol
- **Button press** avec feedback tactile
- **Loading states** avec spinners

### Configuration

```javascript
// Personnaliser les animations
ASL_CONFIG.animations = {
  duration: 800,        // Durée par défaut
  easing: 'power2.out', // Fonction d'easing
  stagger: 0.15,        // Délai entre éléments
  scrollTriggerOffset: '80%' // Trigger scroll
};
```

### Respect des préférences utilisateur

Le système respecte automatiquement `prefers-reduced-motion` :

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Approche mobile-first

Le design suit une approche mobile-first avec des breakpoints optimisés :

```css
/* Mobile par défaut */
/* Styles de base */

/* Small devices (480px+) */
@media (min-width: 480px) { /* ... */ }

/* Tablets (768px+) */
@media (min-width: 768px) { /* ... */ }

/* Desktop (1024px+) */
@media (min-width: 1024px) { /* ... */ }

/* Large screens (1440px+) */
@media (min-width: 1440px) { /* ... */ }
```

### Composants adaptatifs

#### Navigation
- **Desktop** : menu horizontal
- **Mobile** : hamburger menu avec overlay
- **Tablet** : hybride selon l'orientation

#### Grilles
- **Système flexbox/grid** adaptatif
- **Colonnes variables** selon l'écran
- **Gaps responsifs** avec clamp()

#### Typographie
- **Fluid typography** avec clamp()
- **Échelles optimisées** par appareil
- **Line-height adaptatif**

### Images responsives

```html
<!-- Images avec srcset -->
<img src="image-800.jpg" 
     srcset="image-400.jpg 400w, 
             image-800.jpg 800w, 
             image-1200.jpg 1200w"
     sizes="(max-width: 768px) 100vw, 
            (max-width: 1024px) 50vw, 
            25vw"
     alt="Description" 
     loading="lazy">
```

---

## ⚡ Performance et optimisations

### Métriques cibles

- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

### Optimisations implémentées

#### Chargement
- **Critical CSS** inliné
- **Preconnect** aux domaines externes
- **Preload** des ressources critiques
- **Lazy loading** des images

#### JavaScript
- **Code splitting** par fonctionnalité
- **Tree shaking** des dépendances
- **Compression** gzip/brotli
- **Service Worker** pour le cache

#### Images
- **WebP avec fallback** JPEG
- **Compression optimisée**
- **Dimensions définies** pour éviter CLS
- **Blur placeholder** pendant le chargement

#### Fonts
- **Font display: swap**
- **Preload des polices critiques**
- **Fallback system fonts**

### Monitoring

```javascript
// Mesure automatique des performances
window.addEventListener('load', () => {
  const perfData = Utils.measurePerformance();
  
  // Envoi vers analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      name: 'load',
      value: Math.round(perfData.loadTime)
    });
  }
});
```

---

## ♿ Accessibilité

### Standards respectés

- **WCAG 2.1 niveau AA**
- **Section 508** (États-Unis)
- **RGAA 4.1** (France)

### Fonctionnalités implémentées

#### Navigation clavier
- **Tab order** logique
- **Focus visible** amélioré
- **Skip links** vers le contenu principal
- **Raccourcis clavier** pour les carrousels

#### Lecteurs d'écran
- **ARIA labels** complets
- **Roles** sémantiques appropriés
- **States** dynamiques (expanded, selected)
- **Live regions** pour les notifications

#### Contraste et couleurs
- **Ratio de contraste** > 4.5:1
- **Information non basée** uniquement sur la couleur
- **Focus indicators** visibles

#### Formulaires
- **Labels associés** correctement
- **Messages d'erreur** explicites
- **Instructions** claires
- **Validation** accessible

### Tests d'accessibilité

```javascript
// Tests automatisés recommandés
// - axe-core
// - WAVE
// - Lighthouse accessibility audit

// Test manuel avec
// - Navigation clavier uniquement
// - Lecteur d'écran (NVDA/JAWS)
// - Zoom 200%
```

---

## 🚀 Déploiement

### Checklist pré-déploiement

#### Configuration
- [ ] Variables d'environnement configurées
- [ ] API keys Membri 365 valides
- [ ] SSL/TLS activé
- [ ] Service Worker configuré

#### Performance
- [ ] Images optimisées et compressées
- [ ] CSS/JS minifiés
- [ ] Gzip/Brotli activé
- [ ] CDN configuré si applicable

#### SEO
- [ ] Meta tags complétés
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] Schema.org markup ajouté

#### Sécurité
- [ ] Headers de sécurité configurés
- [ ] CSP (Content Security Policy) défini
- [ ] Formulaires protégés contre CSRF
- [ ] Validation côté serveur

### Environnements

#### Développement
```bash
# Serveur local avec live reload
python -m http.server 8000
# ou
npx live-server --port=8000
```

#### Staging
- Tests d'intégration complets
- Validation des APIs
- Tests de performance
- Audit d'accessibilité

#### Production
- Monitoring des erreurs activé
- Analytics configuré
- Sauvegardes automatiques
- Certificats SSL valides

### Scripts de déploiement

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement ASL v3.0.0"

# Optimisation des assets
echo "📦 Optimisation des assets..."
npx imagemin assets/images/* --out-dir=dist/images
npx postcss asl_custom.css --output dist/asl_custom.min.css
npx terser asl_main.js --output dist/asl_main.min.js

# Upload vers le serveur
echo "📤 Upload vers le serveur..."
rsync -avz --delete dist/ user@server:/var/www/html/asl/

echo "✅ Déploiement terminé!"
```

---

## 🔧 Maintenance

### Monitoring

#### Métriques à surveiller
- **Temps de réponse** des pages
- **Taux d'erreur JavaScript**
- **Performance Core Web Vitals**
- **Disponibilité API Membri 365**

#### Outils recommandés
- **Google Analytics** pour le trafic
- **Google Search Console** pour le SEO
- **Sentry** pour les erreurs JavaScript
- **Pingdom/UptimeRobot** pour la disponibilité

### Mises à jour

#### Fréquence recommandée
- **Sécurité** : immédiate
- **Bug fixes** : hebdomadaire
- **Nouvelles fonctionnalités** : mensuelle
- **Dépendances** : trimestrielle

#### Processus de mise à jour
1. **Tests en staging**
2. **Sauvegarde complète**
3. **Déploiement en production**
4. **Vérification post-déploiement**
5. **Rollback si nécessaire**

### Sauvegarde

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/asl"

# Sauvegarde des fichiers
tar -czf "$BACKUP_DIR/asl_files_$DATE.tar.gz" /var/www/html/asl/

# Sauvegarde de la base de données (si applicable)
# mysqldump -u user -p database > "$BACKUP_DIR/asl_db_$DATE.sql"

echo "✅ Sauvegarde créée : asl_files_$DATE.tar.gz"
```

### Logs et debugging

#### Activer le mode debug
```javascript
// En développement uniquement
ASL_CONFIG.debug.enabled = true;
ASL_CONFIG.debug.logLevel = 'debug';
```

#### Logs importants à surveiller
- Erreurs JavaScript dans la console
- Échecs d'appels API Membri 365
- Erreurs de Service Worker
- Métriques de performance

### Support et contact

#### Équipe de développement
- **Lead Developer** : [email]
- **DevOps** : [email]
- **Design** : [email]

#### Ressources utiles
- [Documentation Membri 365](https://docs.membri365.com)
- [GSAP Documentation](https://greensock.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 📞 Support technique

### Problèmes courants

#### "Les membres ne se chargent pas"
1. Vérifier la connexion API Membri 365
2. Contrôler les tokens d'authentification
3. Vérifier les CORS si développement local

#### "Animations saccadées"
1. Vérifier la charge CPU
2. Désactiver temporairement les animations
3. Optimiser les performances GPU

#### "Site lent sur mobile"
1. Auditer avec Lighthouse
2. Vérifier la taille des images
3. Optimiser le JavaScript

### Contacts

Pour toute question technique ou assistance :

- **Email** : dev@armateurs-saint-laurent.ca
- **Documentation** : Ce fichier README.md
- **Issues** : Système de tickets interne

---

*Dernière mise à jour : Janvier 2025*  
*Version : 3.0.0*  
*Auteur : Équipe de développement ASL*