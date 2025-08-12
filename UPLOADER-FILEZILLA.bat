@echo off
cls
echo ========================================
echo   ARMATEURS DU SAINT-LAURENT
echo   Preparation pour FileZilla
echo ========================================
echo.

:: Vérifier si Node.js est installé
echo [1/4] Verification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERREUR: Node.js n'est pas installe
    echo.
    echo SOLUTION:
    echo 1. Allez sur https://nodejs.org/
    echo 2. Telechargez et installez Node.js LTS
    echo 3. Relancez ce script
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js detecte

:: Installation des dépendances
echo.
echo [2/4] Installation des dependances...
call npm install
if errorlevel 1 (
    echo ❌ ERREUR lors de l'installation
    pause
    exit /b 1
)
echo ✅ Dependances installees

:: Build de production
echo.
echo [3/4] Generation du build de production...
call npm run build
if errorlevel 1 (
    echo ❌ ERREUR lors du build
    pause
    exit /b 1
)
echo ✅ Build genere

:: Vérification et préparation
echo.
echo [4/4] Preparation pour FileZilla...

if not exist "dist" (
    echo ❌ ERREUR: Le dossier dist n'existe pas
    pause
    exit /b 1
)

:: Créer le fichier .htaccess
echo Création du fichier .htaccess...
(
echo RewriteEngine On
echo RewriteBase /
echo RewriteCond %%{REQUEST_FILENAME} !-f
echo RewriteCond %%{REQUEST_FILENAME} !-d
echo RewriteRule . /index.html [L]
echo.
echo ^<IfModule mod_expires.c^>
echo ExpiresActive on
echo ExpiresByType text/css "access plus 1 year"
echo ExpiresByType application/javascript "access plus 1 year"
echo ExpiresByType image/png "access plus 1 year"
echo ExpiresByType image/jpg "access plus 1 year"
echo ExpiresByType image/jpeg "access plus 1 year"
echo ExpiresByType text/html "access plus 1 hour"
echo ^</IfModule^>
echo.
echo ^<IfModule mod_headers.c^>
echo Header always set X-Frame-Options "DENY"
echo Header always set X-Content-Type-Options "nosniff"
echo ^</IfModule^>
) > dist\.htaccess

echo ✅ Fichier .htaccess cree

:: Afficher les informations
echo.
echo ========================================
echo 🎉 PRET POUR FILEZILLA !
echo ========================================
echo.
echo 📁 DOSSIER A UPLOADER: dist\
echo.
echo 🚀 INSTRUCTIONS FILEZILLA:
echo 1. Ouvrez FileZilla
echo 2. Connectez-vous a votre serveur
echo 3. SUPPRIMEZ tout le contenu actuel du serveur
echo 4. Uploadez TOUT le contenu du dossier 'dist\'
echo 5. Testez: https://www.armateurs.ca/
echo.
echo 📊 CONTENU DU BUILD:
dir dist
echo.
echo ⚠️  IMPORTANT:
echo - Uploadez SEULEMENT le contenu de 'dist\'
echo - N'uploadez PAS les dossiers src, node_modules, etc.
echo.
echo 🌐 Apres l'upload, votre site sera en ligne !
echo.
pause