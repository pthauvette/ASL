#!/bin/bash

echo "🚀 Build de production - Armateurs du Saint-Laurent"
echo "================================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+ avant de continuer."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer npm avant de continuer."
    exit 1
fi

echo "📦 Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "🔨 Génération du build de production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

# Vérifier si le dossier dist a été créé
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist n'a pas été créé"
    exit 1
fi

echo "📁 Création du fichier .htaccess pour Apache..."
cat > dist/.htaccess << 'EOF'
# Configuration Apache pour Armateurs du Saint-Laurent
# Single Page Application (SPA) support

RewriteEngine On
RewriteBase /

# Handle SPA routing - redirect all non-file requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]

# Cache static assets for better performance
<IfModule mod_expires.c>
    ExpiresActive on
    
    # CSS and JavaScript
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/x-javascript "access plus 1 year"
    
    # Images
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    
    # Fonts
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
    
    # HTML should not be cached as much
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
    
    # HTTPS security (uncomment when SSL is configured)
    # Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>

# Prevent access to sensitive files
<Files ".env*">
    Order allow,deny
    Deny from all
</Files>

<Files "*.json">
    <RequireAll>
        Require all denied
        Require expr "%{REQUEST_URI} =~ m#/(manifest|site)\.json$#"
    </RequireAll>
</Files>

# Prevent directory browsing
Options -Indexes

# Custom error pages (optional)
# ErrorDocument 404 /index.html
# ErrorDocument 500 /index.html
EOF

echo "📊 Analyse du build généré..."
echo "Taille totale du build:"
du -sh dist/

echo "📋 Fichiers dans le build:"
ls -la dist/

echo ""
echo "✅ Build de production généré avec succès!"
echo ""
echo "🔗 Prochaines étapes pour le déploiement:"
echo "1. Supprimez TOUS les fichiers actuels sur votre serveur"
echo "2. Uploadez UNIQUEMENT le contenu du dossier 'dist/' vers votre serveur"
echo "3. Le fichier .htaccess est inclus automatiquement"
echo "4. Testez l'URL: https://www.armateurs.ca/"
echo ""
echo "📁 Contenu à uploader: dist/*"
echo "⚠️  NE PAS uploader: src/, node_modules/, package.json, etc."
echo ""
echo "🎉 Votre site sera prêt après l'upload!"
EOF

chmod +x build.sh

echo "✅ Script de build créé avec succès!"