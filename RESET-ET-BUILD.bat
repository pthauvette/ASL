@echo off
cls
echo ========================================
echo   ARMATEURS DU SAINT-LAURENT
echo   Reset Complet et Build
echo ========================================
echo.

echo ⚠️  ATTENTION : Ce script va :
echo 1. Supprimer node_modules
echo 2. Supprimer package-lock.json
echo 3. Supprimer le dossier dist
echo 4. Réinstaller toutes les dépendances
echo 5. Faire un build propre
echo.
echo Appuyez sur une touche pour continuer ou CTRL+C pour annuler...
pause >nul

echo.
echo [1/7] Suppression de node_modules...
if exist "node_modules" (
    rmdir /s /q "node_modules"
    echo ✅ node_modules supprimé
) else (
    echo ✅ node_modules n'existait pas
)

echo.
echo [2/7] Suppression de package-lock.json...
if exist "package-lock.json" (
    del "package-lock.json"
    echo ✅ package-lock.json supprimé
) else (
    echo ✅ package-lock.json n'existait pas
)

echo.
echo [3/7] Suppression du dossier dist...
if exist "dist" (
    rmdir /s /q "dist"
    echo ✅ dossier dist supprimé
) else (
    echo ✅ dossier dist n'existait pas
)

echo.
echo [4/7] Nettoyage du cache npm...
call npm cache clean --force
echo ✅ Cache npm nettoyé

echo.
echo [5/7] Installation propre des dépendances...
call npm install
if errorlevel 1 (
    echo ❌ ERREUR lors de l'installation
    pause
    exit /b 1
)
echo ✅ Dépendances installées

echo.
echo [6/7] Build de production...
call npx vite build
if errorlevel 1 (
    echo ❌ ERREUR lors du build
    echo.
    echo Vérifiez les erreurs ci-dessus et corrigez-les.
    pause
    exit /b 1
)
echo ✅ Build réussi

echo.
echo [7/7] Création du .htaccess...
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
echo ✅ .htaccess créé

echo.
echo ========================================
echo 🎉 RESET ET BUILD TERMINÉS !
echo ========================================
echo.
echo 📁 Votre application React est maintenant dans dist/
echo.
echo 🚀 PROCHAINES ÉTAPES :
echo 1. Ouvrez FileZilla
echo 2. Supprimez tout sur votre serveur
echo 3. Uploadez TOUT le contenu de dist/
echo 4. Testez https://www.armateurs.ca/
echo.
echo ✨ Votre site Armateurs du Saint-Laurent sera fonctionnel !
echo.
pause