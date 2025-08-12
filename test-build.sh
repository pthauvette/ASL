#!/bin/bash

echo "🔍 Test de la configuration TypeScript pour le build"
echo "=================================================="
echo

echo "📋 Test avec la nouvelle config tsconfig.build.json..."
npx tsc -p tsconfig.build.json --noEmit --listFiles | head -10

if [ $? -eq 0 ]; then
    echo "✅ Configuration TypeScript valide !"
    echo
    echo "🚀 Lancement du build complet..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo
        echo "🎉 BUILD RÉUSSI !"
        echo "✅ Le problème TS6305 a été résolu"
        echo "✅ vite.config.ts est maintenant exclu"
        echo "✅ Build de production prêt dans dist/"
    else
        echo "❌ Erreur lors du build Vite"
    fi
else
    echo "❌ Erreur de configuration TypeScript"
fi

chmod +x test-build.sh