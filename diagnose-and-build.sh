#!/bin/bash

clear
echo "🔍 ========================================"
echo "   DIAGNOSTIC ET BUILD COMPLET"
echo "   Armateurs du Saint-Laurent"
echo "========================================"
echo

echo "📋 [1/8] Diagnostic des fichiers..."
echo "Contenu de components/member/utils/:"
ls -la components/member/utils/ 2>/dev/null || echo "Dossier non trouvé"

echo
echo "📋 [2/8] Vérification des imports problématiques..."
grep -r "portal-utils'" components/ --include="*.tsx" --include="*.ts" | head -10

echo
echo "🧹 [3/8] Nettoyage complet..."
rm -rf node_modules/.cache 2>/dev/null
rm -rf dist 2>/dev/null

echo
echo "📦 [4/8] Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    exit 1
fi

echo
echo "🔍 [5/8] Vérification TypeScript avec config build..."
npx tsc -p tsconfig.build.json --noEmit --listFiles | grep -E "(portal-utils|messaging-utils)" | head -10

echo
echo "📝 [6/8] Test des imports spécifiques..."
node -e "
try {
  const path = './components/member/utils/portal-utils.tsx';
  console.log('Test import:', path);
  // Test basic syntax
  const fs = require('fs');
  if (fs.existsSync(path)) {
    console.log('✅ Fichier exists');
  } else {
    console.log('❌ Fichier manquant');
  }
} catch(e) {
  console.log('❌ Erreur:', e.message);
}
"

echo
echo "⚡ [7/8] Build de production..."
npm run build

BUILD_STATUS=$?

echo
echo "📊 [8/8] Résultats..."
if [ $BUILD_STATUS -eq 0 ]; then
    echo "🎉 BUILD RÉUSSI !"
    echo "✅ Taille du build:"
    du -sh dist/ 2>/dev/null || echo "Dossier dist non trouvé"
    echo "✅ Fichiers générés:"
    ls -la dist/ 2>/dev/null | head -10
else
    echo "❌ ERREURS DÉTECTÉES"
    echo
    echo "🔧 SOLUTIONS SUGGÉRÉES:"
    echo "1. Vérifiez les erreurs TypeScript ci-dessus"
    echo "2. Vérifiez que tous les fichiers .tsx existent"
    echo "3. Supprimez manuellement les fichiers .ts fantômes"
    echo "4. Relancez: npm run build"
fi

echo
echo "🏁 Diagnostic terminé"

chmod +x diagnose-and-build.sh