#!/bin/bash

# Script simplifié pour Mac - Armateurs du Saint-Laurent
clear

echo "🚢 ========================================"
echo "   ARMATEURS DU SAINT-LAURENT - MAC"
echo "   Compilation Application React"
echo "========================================"
echo

# Vérification que nous sommes dans le bon dossier
if [ ! -f "App.tsx" ]; then
    echo "❌ ERREUR: Vous n'êtes pas dans le dossier du projet Armateurs"
    echo "   App.tsx introuvable"
    echo
    echo "SOLUTION:"
    echo "1. Ouvrez Terminal"
    echo "2. Tapez: cd "
    echo "3. Glissez le dossier de votre projet dans Terminal"
    echo "4. Appuyez sur Entrée"
    echo "5. Relancez: ./BUILD-MAC.sh"
    echo
    exit 1
fi

echo "✅ Dossier projet détecté"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ ERREUR: Node.js non installé"
    echo
    echo "INSTALLATION:"
    echo "1. Allez sur: https://nodejs.org/"
    echo "2. Téléchargez la version LTS"
    echo "3. Installez et relancez ce script"
    echo
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js détecté: $NODE_VERSION"

# Nettoyer ancien build
echo
echo "🧹 Nettoyage ancien build..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "✅ Ancien dossier dist supprimé"
fi

# Installation des dépendances
echo
echo "📦 Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    echo
    echo "SOLUTIONS:"
    echo "1. Vérifiez votre connexion internet"
    echo "2. Essayez: rm -rf node_modules package-lock.json && npm install"
    echo
    exit 1
fi

echo "✅ Dépendances installées"

# Build de production
echo
echo "⚡ Compilation en cours..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la compilation"
    echo
    echo "Vérifiez les erreurs ci-dessus et corrigez-les"
    exit 1
fi

echo "✅ Compilation réussie"

# Créer .htaccess
echo
echo "🔧 Configuration serveur..."
cat > dist/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /

# Rediriger toutes les routes vers index.html (SPA)
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
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE text/html
</IfModule>
EOF

echo "✅ Configuration serveur créée"

# Statistiques du build
echo
echo "📊 STATISTIQUES DU BUILD:"
echo "----------------------------------------"
if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist/ | cut -f1)
    FILE_COUNT=$(find dist/ -type f | wc -l | tr -d ' ')
    echo "📁 Taille total: $DIST_SIZE"
    echo "📄 Nombre de fichiers: $FILE_COUNT"
    echo
    echo "📂 Contenu principal:"
    ls -la dist/ | head -10
else
    echo "❌ Dossier dist non trouvé"
fi

echo
echo "🎉 ========================================"
echo "   COMPILATION TERMINÉE AVEC SUCCÈS !"
echo "========================================"
echo
echo "🚀 PROCHAINES ÉTAPES:"
echo "1. Ouvrez FileZilla"
echo "2. Connectez-vous à votre serveur"
echo "3. SUPPRIMEZ tout le contenu du serveur"
echo "4. Uploadez TOUT le contenu du dossier 'dist/'"
echo "5. Testez: https://www.armateurs.ca/"
echo
echo "✨ Votre application Armateurs du Saint-Laurent"
echo "   est maintenant prête pour la production !"
echo
echo "📱 Fonctionnalités incluses:"
echo "   • Site vitrine complet"
echo "   • Processus d'inscription en 6 étapes"
echo "   • Portail membre avec authentification"
echo "   • Interface responsive mobile/desktop"
echo "   • Optimisations SEO et performance"
echo

# Rendre le script exécutable
chmod +x BUILD-MAC.sh