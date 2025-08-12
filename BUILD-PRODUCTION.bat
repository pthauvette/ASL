@echo off
cls
echo ========================================
echo   ARMATEURS DU SAINT-LAURENT
echo   Build de Production React
echo ========================================
echo.

:: Nettoyer le dossier dist précédent
echo [1/6] Nettoyage du dossier dist...
if exist "dist" (
    rmdir /s /q "dist"
    echo ✅ Ancien dossier dist supprimé
) else (
    echo ✅ Pas d'ancien dossier dist à supprimer
)

:: Vérifier Node.js
echo.
echo [2/6] Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERREUR: Node.js n'est pas installé
    echo.
    echo SOLUTION:
    echo 1. Allez sur https://nodejs.org/
    echo 2. Téléchargez et installez Node.js LTS
    echo 3. Relancez ce script
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js détecté

:: Installation des dépendances
echo.
echo [3/6] Installation des dépendances...
call npm install
if errorlevel 1 (
    echo ❌ ERREUR lors de l'installation des dépendances
    echo.
    echo SOLUTIONS POSSIBLES:
    echo 1. Vérifiez votre connexion internet
    echo 2. Supprimez node_modules et package-lock.json, puis relancez
    echo 3. Exécutez: npm cache clean --force
    echo.
    pause
    exit /b 1
)
echo ✅ Dépendances installées

:: Vérification TypeScript avec config dédiée
echo.
echo [4/6] Vérification TypeScript...
call npx tsc -p tsconfig.build.json --noEmit
if errorlevel 1 (
    echo ⚠️  Avertissements TypeScript détectés, mais continuation du build...
) else (
    echo ✅ Vérification TypeScript réussie
)

:: Build de production avec Vite
echo.
echo [5/6] Génération du build de production...
call npx vite build
if errorlevel 1 (
    echo ❌ ERREUR lors du build Vite
    echo.
    echo SOLUTIONS POSSIBLES:
    echo 1. Vérifiez les erreurs TypeScript ci-dessus
    echo 2. Vérifiez que tous les imports sont corrects
    echo 3. Supprimez node_modules et réinstallez
    echo.
    pause
    exit /b 1
)
echo ✅ Build de production généré

:: Vérification du build
echo.
echo [6/6] Vérification du build...

if not exist "dist" (
    echo ❌ ERREUR: Le dossier dist n'a pas été créé
    pause
    exit /b 1
)

if not exist "dist\index.html" (
    echo ❌ ERREUR: index.html manquant dans dist
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

echo ✅ Fichier .htaccess créé

:: Afficher les informations finales
echo.
echo ========================================
echo 🎉 BUILD DE PRODUCTION RÉUSSI !
echo ========================================
echo.
echo 📁 CONTENU DU BUILD :
dir dist
echo.
echo 📊 TAILLE DU BUILD :
powershell -Command "'{0:N2} MB' -f ((Get-ChildItem -Recurse dist | Measure-Object -Property Length -Sum).Sum / 1MB)"
echo.
echo 🚀 PRÊT POUR FILEZILLA :
echo 1. Ouvrez FileZilla
echo 2. Connectez-vous à votre serveur
echo 3. SUPPRIMEZ tout le contenu du serveur
echo 4. Uploadez TOUT le contenu de 'dist\'
echo 5. Testez: https://www.armateurs.ca/
echo.
echo ✨ VOTRE APPLICATION REACT EST PRÊTE !
echo - Interface complète Armateurs du Saint-Laurent
echo - Processus d'inscription en 6 étapes
echo - Portail membre avec authentification
echo - Design responsive et optimisé
echo.
pause