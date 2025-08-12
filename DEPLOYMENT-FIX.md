# 🚨 CORRECTION DU DÉPLOIEMENT

## Problème identifié
L'écran blanc indique que l'application React n'est pas correctement buildée pour la production. Vous avez copié les fichiers source bruts au lieu du build de production.

## ✅ Solution immédiate

### 1. Build de production local
Sur votre machine de développement, exécutez :

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Générer le build de production
npm run build
```

Cela va créer un dossier `dist/` avec tous les fichiers optimisés.

### 2. Déployer les bons fichiers
**❌ N'utilisez PAS les fichiers source**
**✅ Utilisez uniquement le contenu du dossier `dist/`**

Avec FileZilla, supprimez tous les fichiers actuels sur le serveur et uploadez **uniquement** le contenu du dossier `dist/`.

### 3. Configuration serveur web

#### Pour Apache (.htaccess)
Créez un fichier `.htaccess` dans le répertoire racine :

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Security headers
<IfModule mod_headers.c>
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

#### Pour Nginx
Configuration dans votre bloc server :

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Cache des assets statiques
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Security headers
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### 4. Vérification

Après le déploiement, vérifiez que :
- ✅ L'URL principale charge la page d'accueil
- ✅ La navigation fonctionne
- ✅ Les images et CSS se chargent
- ✅ Pas d'erreurs 404 dans la console du navigateur

## 🔧 Script de déploiement automatique

Créez ce script pour simplifier les futurs déploiements :

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement Armateurs du Saint-Laurent"

# Build de production
echo "📦 Génération du build de production..."
npm run build

# Vérification du build
if [ ! -d "dist" ]; then
    echo "❌ Erreur: Le dossier dist n'existe pas"
    exit 1
fi

echo "✅ Build généré avec succès"
echo "📁 Fichiers prêts dans le dossier 'dist/'"
echo ""
echo "🔗 Prochaines étapes:"
echo "1. Supprimez tous les fichiers sur votre serveur"
echo "2. Uploadez UNIQUEMENT le contenu du dossier 'dist/'"
echo "3. Ajoutez le fichier .htaccess (Apache) ou configurez Nginx"
echo ""
echo "📊 Taille du build:"
du -sh dist/
```

## 🐛 Dépannage

### Erreur "Module not found"
- Vérifiez que tous les imports dans le code pointent vers les bons fichiers
- Assurez-vous que tous les assets Figma sont présents

### Page blanche persistante
1. Ouvrez la console du navigateur (F12)
2. Vérifiez s'il y a des erreurs JavaScript
3. Vérifiez l'onglet Network pour les erreurs 404

### Problèmes de chemins
Si vous déployez dans un sous-dossier (ex: `/app/`), modifiez `base` dans `vite.config.ts` :

```typescript
export default defineConfig({
  base: '/app/', // Remplacez par votre chemin
  // ... reste de la config
});
```

## 📞 Support

Si le problème persiste :
1. Vérifiez les logs d'erreur de votre serveur web
2. Testez le build localement avec `npm run preview`
3. Vérifiez que votre serveur supporte les Single Page Applications (SPA)

---
**Important** : Ne jamais uploader les fichiers source (`src/`, `node_modules/`, etc.) sur un serveur de production !