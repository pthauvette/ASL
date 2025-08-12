@echo off
echo 🚀 Build de production - Armateurs du Saint-Laurent
echo =================================================

:: Vérifier si Node.js est installé
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé. Veuillez installer Node.js 18+ avant de continuer.
    pause
    exit /b 1
)

:: Vérifier si npm est installé
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm n'est pas installé. Veuillez installer npm avant de continuer.
    pause
    exit /b 1
)

echo 📦 Installation des dépendances...
call npm install
if errorlevel 1 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

echo 🔨 Génération du build de production...
call npm run build
if errorlevel 1 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)

:: Vérifier si le dossier dist a été créé
if not exist "dist" (
    echo ❌ Le dossier dist n'a pas été créé
    pause
    exit /b 1
)

echo 📁 Création du fichier .htaccess pour Apache...
(
echo # Configuration Apache pour Armateurs du Saint-Laurent
echo # Single Page Application (SPA^ support
echo.
echo RewriteEngine On
echo RewriteBase /
echo.
echo # Handle SPA routing - redirect all non-file requests to index.html
echo RewriteCond %%{REQUEST_FILENAME} !-f
echo RewriteCond %%{REQUEST_FILENAME} !-d
echo RewriteCond %%{REQUEST_FILENAME} !-l
echo RewriteRule . /index.html [L]
echo.
echo # Cache static assets for better performance
echo ^<IfModule mod_expires.c^>
echo     ExpiresActive on
echo     ExpiresByType text/css "access plus 1 year"
echo     ExpiresByType application/javascript "access plus 1 year"
echo     ExpiresByType image/png "access plus 1 year"
echo     ExpiresByType image/jpg "access plus 1 year"
echo     ExpiresByType image/jpeg "access plus 1 year"
echo     ExpiresByType image/svg+xml "access plus 1 year"
echo     ExpiresByType text/html "access plus 1 hour"
echo ^</IfModule^>
echo.
echo # Enable compression
echo ^<IfModule mod_deflate.c^>
echo     AddOutputFilterByType DEFLATE text/plain
echo     AddOutputFilterByType DEFLATE text/html
echo     AddOutputFilterByType DEFLATE text/css
echo     AddOutputFilterByType DEFLATE application/javascript
echo ^</IfModule^>
echo.
echo # Security headers
echo ^<IfModule mod_headers.c^>
echo     Header always set X-Frame-Options "DENY"
echo     Header always set X-Content-Type-Options "nosniff"
echo     Header always set X-XSS-Protection "1; mode=block"
echo ^</IfModule^>
echo.
echo # Prevent access to sensitive files
echo ^<Files ".env*"^>
echo     Order allow,deny
echo     Deny from all
echo ^</Files^>
echo.
echo Options -Indexes
) > dist\.htaccess

echo 📊 Analyse du build généré...
dir dist

echo.
echo ✅ Build de production généré avec succès!
echo.
echo 🔗 Prochaines étapes pour le déploiement:
echo 1. Supprimez TOUS les fichiers actuels sur votre serveur
echo 2. Uploadez UNIQUEMENT le contenu du dossier 'dist/' vers votre serveur
echo 3. Le fichier .htaccess est inclus automatiquement
echo 4. Testez l'URL: https://www.armateurs.ca/
echo.
echo 📁 Contenu à uploader: dist\*
echo ⚠️  NE PAS uploader: src\, node_modules\, package.json, etc.
echo.
echo 🎉 Votre site sera prêt après l'upload!
echo.
pause