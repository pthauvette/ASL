#!/bin/bash

clear
echo "========================================"
echo "   ARMATEURS DU SAINT-LAURENT"
echo "   Préparation pour FileZilla"
echo "========================================"
echo

# Vérifier Node.js
echo "[1/4] Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ ERREUR: Node.js n'est pas installé"
    echo
    echo "SOLUTION:"
    echo "1. Allez sur https://nodejs.org/"
    echo "2. Téléchargez et installez Node.js LTS"
    echo "3. Relancez ce script"
    echo
    exit 1
fi
echo "✅ Node.js détecté"

# Installation des dépendances
echo
echo "[2/4] Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ ERREUR lors de l'installation"
    exit 1
fi
echo "✅ Dépendances installées"

# Build de production
echo
echo "[3/4] Génération du build de production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ ERREUR lors du build"
    exit 1
fi
echo "✅ Build généré"

# Vérification et préparation
echo
echo "[4/4] Préparation pour FileZilla..."

if [ ! -d "dist" ]; then
    echo "❌ ERREUR: Le dossier dist n'existe pas"
    exit 1
fi

# Créer le fichier .htaccess
echo "Création du fichier .htaccess..."
cat > dist/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType text/html "access plus 1 hour"
</IfModule>

<IfModule mod_headers.c>
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
</IfModule>
EOF

echo "✅ Fichier .htaccess créé"

# Afficher les informations
echo
echo "========================================"
echo "🎉 PRÊT POUR FILEZILLA !"
echo "========================================"
echo
echo "📁 DOSSIER À UPLOADER: dist/"
echo
echo "🚀 INSTRUCTIONS FILEZILLA:"
echo "1. Ouvrez FileZilla"
echo "2. Connectez-vous à votre serveur"
echo "3. SUPPRIMEZ tout le contenu actuel du serveur"
echo "4. Uploadez TOUT le contenu du dossier 'dist/'"
echo "5. Testez: https://www.armateurs.ca/"
echo
echo "📊 CONTENU DU BUILD:"
ls -la dist/
echo
echo "⚠️  IMPORTANT:"
echo "- Uploadez SEULEMENT le contenu de 'dist/'"
echo "- N'uploadez PAS les dossiers src, node_modules, etc."
echo
echo "🌐 Après l'upload, votre site sera en ligne !"
echo

chmod +x UPLOADER-FILEZILLA.sh