# Guide de Déploiement - Armateurs du Saint-Laurent

## 📋 Pré-requis

- Node.js 18+ et npm/yarn
- Accès au domaine `armateurs-saint-laurent.ca`
- Compte de déploiement (Vercel, Netlify, ou serveur)

## 🚀 Étapes de Déploiement

### 1. Préparation du Build

```bash
# Installation des dépendances
npm install

# Vérification des types TypeScript
npm run type-check

# Build de production
npm run build

# Test local du build
npm run preview
```

### 2. Configuration Environnement

Copier `.env.production` et ajuster selon l'environnement :

```bash
cp .env.production .env.local
```

Variables importantes :
- `VITE_APP_URL` : URL du site en production
- `VITE_FORCE_DEMO_MODE` : `true` pour mode démonstration
- `VITE_MEMBRI_*` : Configuration API Membri 365

### 3. Vérifications Pré-déploiement

#### ✅ Checklist SEO
- [ ] Métadonnées complètes dans `index.html`
- [ ] Fichier `robots.txt` configuré
- [ ] Sitemap XML généré
- [ ] Favicon et icônes configurés
- [ ] Données structurées (JSON-LD)

#### ✅ Checklist Performance
- [ ] Images optimisées (Figma assets)
- [ ] Fonts préchargées (Google Fonts)
- [ ] CSS critique inline
- [ ] Service Worker prêt (PWA)

#### ✅ Checklist Fonctionnel
- [ ] Navigation complète fonctionnelle
- [ ] Formulaire d'inscription opérationnel
- [ ] Mode démonstration actif
- [ ] Responsive design testé
- [ ] Accessibilité validée

### 4. Déploiement Vercel (Recommandé)

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod

# Configuration domaine personnalisé
vercel domains add armateurs-saint-laurent.ca
```

#### Configuration Vercel (vercel.json)
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/accueil",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 5. Déploiement Netlify (Alternative)

```bash
# Build et déploiement
npm run build
netlify deploy --prod --dir=dist

# Ou via Git (recommandé)
# Connecter repository GitHub à Netlify
```

#### Configuration Netlify (_redirects)
```
# Redirections
/accueil / 301
/home / 301

# SPA fallback
/* /index.html 200

# Headers de sécurité
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### 6. Post-déploiement

#### 🔍 Tests de Production
```bash
# Test des performances
npm run test:lighthouse

# Validation SEO
npm run test:seo

# Tests E2E
npm run test:e2e
```

#### 📊 Monitoring
- Google Analytics/Search Console
- Performance monitoring (Core Web Vitals)
- Uptime monitoring
- Error tracking (Sentry optionnel)

## 🛠 Maintenance

### Mises à jour
- Mettre à jour les données membres via API Membri
- Surveiller les performances
- Maintenir les dépendances à jour

### Backup
- Code source : Repository Git
- Configuration : Variables d'environnement
- Assets : Figma + repository

## 🔧 Configuration DNS

### Domaine Principal
```
Type: A
Name: @
Value: [IP du CDN/serveur]

Type: CNAME
Name: www
Value: armateurs-saint-laurent.ca
```

### Sous-domaines (optionnels)
```
Type: CNAME
Name: portal
Value: armateurs-saint-laurent.ca

Type: CNAME
Name: membres
Value: armateurs-saint-laurent.ca
```

## 📞 Support

- **Technique** : support@armateurs-saint-laurent.ca
- **Contenu** : info@armateurs-saint-laurent.ca
- **Documentation** : Voir `/docs/` dans le repository

## 🔒 Sécurité

### Headers de Sécurité
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### HTTPS
- Certificat SSL/TLS requis
- HSTS recommandé
- Redirection HTTP → HTTPS

### Content Security Policy (CSP)
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https://images.unsplash.com https://figma.com;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://api.membri365.com;
```

---

**Version** : 1.0.0  
**Dernière mise à jour** : Août 2025  
**Contact** : support@armateurs-saint-laurent.ca