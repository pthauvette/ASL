@echo off
cls
echo ========================================
echo   ARMATEURS DU SAINT-LAURENT
echo   Packaging Final pour Déploiement
echo ========================================
echo.

echo 🧹 [1/6] Nettoyage des fichiers temporaires...

:: Supprimer les fichiers de déploiement redondants
if exist "DEPLOYMENT-FIX.md" del "DEPLOYMENT-FIX.md"
if exist "DEPLOYMENT.md" del "DEPLOYMENT.md"
if exist "GENERER-POUR-FILEZILLA.bat" del "GENERER-POUR-FILEZILLA.bat"
if exist "GUIDE-FILEZILLA.md" del "GUIDE-FILEZILLA.md"
if exist "LISEZ-MOI-URGENT.md" del "LISEZ-MOI-URGENT.md"
if exist "README-DEPLOYMENT.md" del "README-DEPLOYMENT.md"
if exist "RESET-ET-BUILD.bat" del "RESET-ET-BUILD.bat"
if exist "SOLUTION-FINALE-SIMPLE.md" del "SOLUTION-FINALE-SIMPLE.md"
if exist "SOLUTION-SIMPLE.txt" del "SOLUTION-SIMPLE.txt"
if exist "UPLOAD-FINAL-GUIDE.md" del "UPLOAD-FINAL-GUIDE.md"
if exist "UPLOADER-FILEZILLA.bat" del "UPLOADER-FILEZILLA.bat"
if exist "UPLOADER-FILEZILLA.sh" del "UPLOADER-FILEZILLA.sh"
if exist "URGENT-DEPLOYMENT.md" del "URGENT-DEPLOYMENT.md"
if exist "build.bat" del "build.bat"
if exist "build.sh" del "build.sh"
if exist "test.html" del "test.html"
if exist "verifier.js" del "verifier.js"

:: Supprimer l'ancien dossier dist
if exist "dist" rmdir /s /q "dist"

echo ✅ Fichiers temporaires supprimés

echo.
echo 📦 [2/6] Installation des dépendances...
call npm install
if errorlevel 1 (
    echo ❌ Erreur lors de l'installation
    pause
    exit /b 1
)
echo ✅ Dépendances installées

echo.
echo ⚡ [3/6] Build de production...
call npm run build
if errorlevel 1 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)
echo ✅ Build réussi

echo.
echo 🔧 [4/6] Configuration serveur...
(
echo RewriteEngine On
echo RewriteBase /
echo.
echo # Redirection SPA
echo RewriteCond %%{REQUEST_FILENAME} !-f
echo RewriteCond %%{REQUEST_FILENAME} !-d
echo RewriteCond %%{REQUEST_FILENAME} !-l
echo RewriteRule . /index.html [L]
echo.
echo # Cache des ressources
echo ^<IfModule mod_expires.c^>
echo ExpiresActive on
echo ExpiresByType text/css "access plus 1 year"
echo ExpiresByType application/javascript "access plus 1 year"
echo ExpiresByType image/png "access plus 1 year"
echo ExpiresByType image/jpg "access plus 1 year"
echo ExpiresByType image/jpeg "access plus 1 year"
echo ExpiresByType image/svg+xml "access plus 1 year"
echo ExpiresByType text/html "access plus 1 hour"
echo ^</IfModule^>
echo.
echo # Headers de sécurité
echo ^<IfModule mod_headers.c^>
echo Header always set X-Frame-Options "DENY"
echo Header always set X-Content-Type-Options "nosniff"
echo Header always set X-XSS-Protection "1; mode=block"
echo Header always set Referrer-Policy "strict-origin-when-cross-origin"
echo ^</IfModule^>
echo.
echo # Compression
echo ^<IfModule mod_deflate.c^>
echo AddOutputFilterByType DEFLATE text/css
echo AddOutputFilterByType DEFLATE application/javascript
echo AddOutputFilterByType DEFLATE text/html
echo AddOutputFilterByType DEFLATE application/json
echo ^</IfModule^>
) > dist\.htaccess

echo ✅ Configuration serveur créée

echo.
echo 📊 [5/6] Vérification du build...
if not exist "dist\index.html" (
    echo ❌ ERREUR: index.html manquant
    pause
    exit /b 1
)

:: Calculer la taille
powershell -Command "$size = (Get-ChildItem -Recurse dist | Measure-Object -Property Length -Sum).Sum / 1MB; Write-Host ('Taille du build: {0:N2} MB' -f $size)"

:: Compter les fichiers
powershell -Command "$count = (Get-ChildItem -Recurse dist -File).Count; Write-Host ('Nombre de fichiers: ' + $count)"

echo ✅ Build vérifié

echo.
echo 📦 [6/6] Création du package final...

:: Créer un dossier de package avec timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,8%-%datetime:~8,4%
set package_name=armateurs-saint-laurent-%timestamp%

if exist "%package_name%" rmdir /s /q "%package_name%"
mkdir "%package_name%"

:: Copier les fichiers essentiels
xcopy "dist\*" "%package_name%\" /E /I /Q
copy "DEPLOIEMENT-FINAL.md" "%package_name%\"
copy "README.md" "%package_name%\"

echo ✅ Package créé: %package_name%

echo.
echo 🎉 ========================================
echo    PACKAGING TERMINÉ AVEC SUCCÈS !
echo ========================================
echo.
echo 📂 PACKAGE CRÉÉ : %package_name%\
echo.
echo 🚀 PROCHAINES ÉTAPES :
echo 1. Ouvrez FileZilla
echo 2. Connectez-vous à votre serveur
echo 3. Supprimez tout le contenu du serveur
echo 4. Uploadez tout le contenu de '%package_name%\'
echo 5. Testez https://www.armateurs.ca/
echo.
echo ✨ FONCTIONNALITÉS INCLUSES :
echo - Site vitrine complet
echo - Processus d'inscription en 6 étapes
echo - Portail membre avec authentification
echo - Système de messagerie et notifications
echo - Répertoire des membres avec recherche
echo - Calendrier d'événements
echo - Design responsive mobile/desktop
echo - Mode démonstration robuste
echo - Optimisations SEO et performance
echo.
echo 🔒 SÉCURISÉ ET OPTIMISÉ POUR LA PRODUCTION
echo.
pause