#!/bin/bash

clear
echo "========================================"
echo "   ARMATEURS DU SAINT-LAURENT"
echo "   Packaging Final pour Déploiement"
echo "========================================"
echo

echo "🧹 [1/6] Nettoyage des fichiers temporaires..."

# Supprimer les fichiers de déploiement redondants
rm -f DEPLOYMENT-FIX.md
rm -f DEPLOYMENT.md
rm -f GENERER-POUR-FILEZILLA.bat
rm -f GUIDE-FILEZILLA.md
rm -f LISEZ-MOI-URGENT.md
rm -f README-DEPLOYMENT.md
rm -f RESET-ET-BUILD.bat
rm -f SOLUTION-FINALE-SIMPLE.md
rm -f SOLUTION-SIMPLE.txt
rm -f UPLOAD-FINAL-GUIDE.md
rm -f UPLOADER-FILEZILLA.bat
rm -f UPLOADER-FILEZILLA.sh
rm -f URGENT-DEPLOYMENT.md
rm -f build.bat
rm -f build.sh
rm -f test.html
rm -f verifier.js

# Supprimer l'ancien dossier dist
rm -rf dist

echo "✅ Fichiers temporaires supprimés"

echo
echo "📦 [2/6] Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    exit 1
fi
echo "✅ Dépendances installées"

echo
echo "⚡ [3/6] Build de production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi
echo "✅ Build réussi"

echo
echo "🔧 [4/6] Configuration serveur..."
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
echo "📊 [5/6] Vérification du build..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ ERREUR: index.html manquant"
    exit 1
fi

# Calculer la taille
BUILD_SIZE=$(du -sh dist/ | cut -f1)
FILE_COUNT=$(find dist/ -type f | wc -l | tr -d ' ')

echo "Taille du build: $BUILD_SIZE"
echo "Nombre de fichiers: $FILE_COUNT"

echo "✅ Build vérifié"

echo
echo "📦 [6/6] Création du package final..."

# Créer un dossier de package avec timestamp
TIMESTAMP=$(date +"%Y%m%d-%H%M")
PACKAGE_NAME="armateurs-saint-laurent-$TIMESTAMP"

rm -rf "$PACKAGE_NAME"
mkdir "$PACKAGE_NAME"

# Copier les fichiers essentiels
cp -r dist/* "$PACKAGE_NAME/"
cp DEPLOIEMENT-FINAL.md "$PACKAGE_NAME/"
cp README.md "$PACKAGE_NAME/"

echo "✅ Package créé: $PACKAGE_NAME"

echo
echo "🎉 ========================================"
echo "    PACKAGING TERMINÉ AVEC SUCCÈS !"
echo "========================================"
echo
echo "📂 PACKAGE CRÉÉ : $PACKAGE_NAME/"
echo
echo "🚀 PROCHAINES ÉTAPES :"
echo "1. Ouvrez FileZilla"
echo "2. Connectez-vous à votre serveur"
echo "3. Supprimez tout le contenu du serveur"
echo "4. Uploadez tout le contenu de '$PACKAGE_NAME/'"
echo "5. Testez https://www.armateurs.ca/"
echo
echo "✨ FONCTIONNALITÉS INCLUSES :"
echo "- Site vitrine complet"
echo "- Processus d'inscription en 6 étapes"
echo "- Portail membre avec authentification"
echo "- Système de messagerie et notifications"
echo "- Répertoire des membres avec recherche"
echo "- Calendrier d'événements"
echo "- Design responsive mobile/desktop"
echo "- Mode démonstration robuste"
echo "- Optimisations SEO et performance"
echo
echo "🔒 SÉCURISÉ ET OPTIMISÉ POUR LA PRODUCTION"
echo

# Rendre le script exécutable
chmod +x PACKAGER-FINAL.sh