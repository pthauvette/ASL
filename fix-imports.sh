#!/bin/bash

echo "🔧 Correction des imports et suppression des fichiers fantômes"
echo "============================================================"

# Supprimer les fichiers .ts s'ils existent encore
echo "🗑️  Suppression des anciens fichiers .ts..."

if [ -f "components/member/utils/messaging-utils.ts" ]; then
    rm components/member/utils/messaging-utils.ts
    echo "✅ messaging-utils.ts supprimé"
else
    echo "ℹ️  messaging-utils.ts déjà supprimé"
fi

if [ -f "components/member/utils/portal-utils.ts" ]; then
    rm components/member/utils/portal-utils.ts
    echo "✅ portal-utils.ts supprimé"
else
    echo "ℹ️  portal-utils.ts déjà supprimé"
fi

# Vérifier que les fichiers .tsx existent
echo
echo "📁 Vérification des fichiers .tsx..."

if [ -f "components/member/utils/messaging-utils.tsx" ]; then
    echo "✅ messaging-utils.tsx existe"
else
    echo "❌ messaging-utils.tsx manquant"
fi

if [ -f "components/member/utils/portal-utils.tsx" ]; then
    echo "✅ portal-utils.tsx existe"
else
    echo "❌ portal-utils.tsx manquant"
fi

# Nettoyer le cache TypeScript
echo
echo "🧹 Nettoyage du cache..."
if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo "✅ Cache node_modules nettoyé"
fi

# Test de compilation
echo
echo "🔍 Test de compilation TypeScript..."
npx tsc -p tsconfig.build.json --noEmit --listFiles | grep -E "(portal-utils|messaging-utils)" || echo "Aucun conflit détecté"

echo
echo "✅ Correction terminée!"
echo
echo "🚀 Pour tester:"
echo "npm run build"

chmod +x fix-imports.sh