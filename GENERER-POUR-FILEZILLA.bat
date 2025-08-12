@echo off
cls
echo ========================================
echo   ARMATEURS DU SAINT-LAURENT
echo   Generation des fichiers pour FileZilla
echo ========================================
echo.

echo ✅ Les fichiers de production sont prêts dans le dossier 'dist'
echo.
echo 📁 CONTENU GENERE :
echo ├── index.html (page principale)
echo ├── .htaccess (configuration serveur)
echo ├── site.webmanifest (manifest PWA)
echo ├── robots.txt (SEO)
echo ├── favicon.svg (icone)
echo └── assets/
echo     ├── css/main.css (styles)
echo     └── js/main.js (application)
echo.

if exist "dist" (
    echo 📊 CONTENU DU DOSSIER DIST :
    dir dist /B
    echo.
) else (
    echo ❌ Le dossier dist n'existe pas encore
    echo.
)

echo ========================================
echo 🚀 INSTRUCTIONS FILEZILLA
echo ========================================
echo.
echo 1. Ouvrez FileZilla
echo 2. Connectez-vous à votre serveur
echo 3. SUPPRIMEZ tout le contenu actuel du serveur
echo 4. Uploadez TOUT le contenu du dossier 'dist\'
echo    (Sélectionnez TOUT dans dist\ et glissez vers le serveur)
echo 5. Vérifiez que .htaccess est bien uploadé
echo 6. Testez : https://www.armateurs.ca/
echo.
echo ⚠️  IMPORTANT :
echo - Uploadez SEULEMENT le contenu de 'dist\'
echo - Ne pas uploader le dossier 'dist' lui-même
echo - Vérifiez que tous les fichiers sont transférés
echo.
echo 🎯 APRÈS L'UPLOAD :
echo Votre site sera immédiatement fonctionnel !
echo.
echo ✨ FONCTIONNALITÉS INCLUSES :
echo - Navigation complète
echo - Design responsive (mobile/desktop)
echo - Optimisations SEO
echo - Configuration serveur automatique
echo - Interface moderne et rapide
echo.
pause