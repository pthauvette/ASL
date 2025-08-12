#!/bin/bash

clear
echo "🔧 ========================================"
echo "   CORRECTION DES ERREURS DE BUILD"
echo "   Armateurs du Saint-Laurent"
echo "========================================"
echo

echo "✅ [1/4] Fichiers JSX renommés en .tsx"
echo "   - messaging-utils.ts → messaging-utils.tsx"
echo "   - portal-utils.ts → portal-utils.tsx"

echo "✅ [2/4] Imports motion/react corrigés vers framer-motion"
echo "   - UnifiedHeader.tsx"
echo "   - WebsitePage.tsx"

echo "✅ [3/4] Package.json mis à jour"
echo "   - motion supprimé"
echo "   - framer-motion ajouté"

echo "✅ [4/4] Imports des utils corrigés"
echo "   - MessagingSystem.tsx"
echo "   - DashboardHighlights.tsx"
echo "   - DashboardRecentActivities.tsx"
echo "   - MemberPortal.tsx"

echo
echo "🚀 INSTALLATION DES DÉPENDANCES..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    exit 1
fi

echo
echo "⚡ BUILD DE PRODUCTION..."
echo "   Utilisation de tsconfig.build.json pour éviter les erreurs TS6305..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    echo
    echo "Vérifiez les erreurs ci-dessus"
    exit 1
fi

echo
echo "🔧 Configuration serveur..."
cat > dist/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /

# Redirection SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]

# Cache des ressources
<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/svg+xml "access plus 1 year"
ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Headers de sécurité
<IfModule mod_headers.c>
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE application/json
</IfModule>
EOF

echo "✅ Configuration serveur créée"

echo
echo "📊 VÉRIFICATION DU BUILD..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ ERREUR: index.html manquant"
    exit 1
fi

BUILD_SIZE=$(du -sh dist/ | cut -f1)
FILE_COUNT=$(find dist/ -type f | wc -l | tr -d ' ')

echo "✅ Build vérifié"
echo "📁 Taille: $BUILD_SIZE"
echo "📄 Fichiers: $FILE_COUNT"

echo
echo "🎉 ========================================"
echo "    BUILD CORRIGÉ AVEC SUCCÈS !"
echo "========================================"
echo
echo "🚀 PROCHAINES ÉTAPES :"
echo "1. Ouvrez FileZilla"
echo "2. Connectez-vous à votre serveur"
echo "3. Supprimez tout le contenu du serveur"
echo "4. Uploadez tout le contenu de 'dist/'"
echo "5. Testez: https://www.armateurs.ca/"
echo
echo "✨ Toutes les erreurs TypeScript ont été corrigées !"
echo

chmod +x CORRECTION-BUILD.sh