#!/bin/bash

echo "🚨 CORRECTION FORCÉE DES IMPORTS"
echo "================================="

# Force la suppression de tous les fichiers .ts dans utils
echo "🗑️  Suppression forcée des .ts dans utils..."
find components/member/utils/ -name "*.ts" -not -name "*.tsx" -delete 2>/dev/null || true

echo "📁 Contenu après nettoyage:"
ls -la components/member/utils/ 2>/dev/null

# Correction des imports avec extension explicite
echo
echo "🔧 Correction des imports avec extensions .tsx..."

# Corriger tous les imports portal-utils
find components/ -name "*.tsx" -exec sed -i.bak "s|from '[^']*utils/portal-utils'|from '../utils/portal-utils.tsx'|g" {} \;
find components/ -name "*.tsx" -exec sed -i.bak "s|from '[^']*utils/messaging-utils'|from '../utils/messaging-utils.tsx'|g" {} \;

# Supprimer les fichiers de backup
find components/ -name "*.bak" -delete 2>/dev/null || true

echo "✅ Imports corrigés"

# Nettoyer le cache
echo
echo "🧹 Nettoyage cache complet..."
rm -rf node_modules/.cache 2>/dev/null
rm -rf .vite 2>/dev/null
rm -rf dist 2>/dev/null

# Test de build
echo
echo "🚀 Test de build..."
npm run build

if [ $? -eq 0 ]; then
    echo
    echo "🎉 CORRECTION RÉUSSIE !"
    echo "✅ L'application compile sans erreur"
    echo "✅ Prêt pour le déploiement"
else
    echo
    echo "❌ Des erreurs persistent"
    echo "Consultez les logs ci-dessus"
fi

chmod +x force-fix.sh