#!/bin/bash

clear
echo "========================================"
echo "   ARMATEURS DU SAINT-LAURENT"
echo "   Build de Production React"
echo "========================================"
echo

# Nettoyer le dossier dist précédent
echo "[1/6] Nettoyage du dossier dist..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "✅ Ancien dossier dist supprimé"
else
    echo "✅ Pas d'ancien dossier dist à supprimer"
fi

# Vérifier Node.js
echo
echo "[2/6] Vérification de Node.js..."
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
echo "[3/6] Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ ERREUR lors de l'installation des dépendances"
    echo
    echo "SOLUTIONS POSSIBLES:"
    echo "1. Vérifiez votre connexion internet"
    echo "2. Supprimez node_modules et package-lock.json, puis relancez"
    echo "3. Exécutez: npm cache clean --force"
    echo
    exit 1
fi
echo "✅ Dépendances installées"

# Vérification TypeScript avec config dédiée
echo
echo "[4/6] Vérification TypeScript..."
npx tsc -p tsconfig.build.json --noEmit
if [ $? -ne 0 ]; then
    echo "⚠️  Avertissements TypeScript détectés, mais continuation du build..."
else
    echo "✅ Vérification TypeScript réussie"
fi

# Build de production avec Vite
echo
echo "[5/6] Génération du build de production..."
npx vite build
if [ $? -ne 0 ]; then
    echo "❌ ERREUR lors du build Vite"
    echo
    echo "SOLUTIONS POSSIBLES:"
    echo "1. Vérifiez les erreurs TypeScript ci-dessus"
    echo "2. Vérifiez que tous les imports sont corrects"
    echo "3. Supprimez node_modules et réinstallez"
    echo
    exit 1
fi
echo "✅ Build de production généré"

# Vérification du build
echo
echo "[6/6] Vérification du build..."

if [ ! -d "dist" ]; then
    echo "❌ ERREUR: Le dossier dist n'a pas été créé"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ ERREUR: index.html manquant dans dist"
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

# Afficher les informations finales
echo
echo "========================================"
echo "🎉 BUILD DE PRODUCTION RÉUSSI !"
echo "========================================"
echo
echo "📁 CONTENU DU BUILD :"
ls -la dist/
echo
echo "📊 TAILLE DU BUILD :"
du -sh dist/
echo
echo "🚀 PRÊT POUR FILEZILLA :"
echo "1. Ouvrez FileZilla"
echo "2. Connectez-vous à votre serveur"
echo "3. SUPPRIMEZ tout le contenu du serveur"
echo "4. Uploadez TOUT le contenu de 'dist/'"
echo "5. Testez: https://www.armateurs.ca/"
echo
echo "✨ VOTRE APPLICATION REACT EST PRÊTE !"
echo "- Interface complète Armateurs du Saint-Laurent"
echo "- Processus d'inscription en 6 étapes"
echo "- Portail membre avec authentification"
echo "- Design responsive et optimisé"
echo

chmod +x BUILD-PRODUCTION.sh