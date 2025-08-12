const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification du projet Armateurs du Saint-Laurent...\n');

const errors = [];
const warnings = [];

// Vérifier les fichiers essentiels
const essentialFiles = [
  'App.tsx',
  'index.html',
  'package.json',
  'vite.config.ts',
  'styles/globals.css'
];

essentialFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    errors.push(`❌ Fichier manquant : ${file}`);
  } else {
    console.log(`✅ ${file}`);
  }
});

// Vérifier les scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!packageJson.scripts.build) {
  errors.push('❌ Script "build" manquant dans package.json');
} else if (packageJson.scripts.build.includes('tsc &&')) {
  warnings.push('⚠️  Script build contient "tsc &&" qui peut causer des problèmes');
} else {
  console.log('✅ Script build configuré');
}

// Vérifier node_modules
if (!fs.existsSync('node_modules')) {
  warnings.push('⚠️  node_modules manquant - exécutez "npm install"');
} else {
  console.log('✅ node_modules présent');
}

// Vérifier la structure des composants
const componentsDir = 'components';
if (!fs.existsSync(componentsDir)) {
  errors.push('❌ Dossier components manquant');
} else {
  const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
  console.log(`✅ ${componentFiles.length} composants trouvés`);
}

// Vérifier les utilitaires
const utilsDir = 'utils';
if (!fs.existsSync(utilsDir)) {
  errors.push('❌ Dossier utils manquant');
} else {
  console.log('✅ Dossier utils présent');
}

// Résumé
console.log('\n' + '='.repeat(50));

if (errors.length === 0 && warnings.length === 0) {
  console.log('🎉 PROJET PRÊT POUR LE BUILD !');
  console.log('\nPROCHAINES ÉTAPES :');
  console.log('1. Exécutez : UPLOADER-FILEZILLA.bat (Windows) ou ./UPLOADER-FILEZILLA.sh (Mac/Linux)');
  console.log('2. Suivez les instructions qui s\'affichent');
  console.log('3. Uploadez le contenu du dossier "dist" avec FileZilla');
} else {
  if (errors.length > 0) {
    console.log('❌ ERREURS À CORRIGER :');
    errors.forEach(error => console.log(error));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  AVERTISSEMENTS :');
    warnings.forEach(warning => console.log(warning));
  }
  
  console.log('\n🔧 CORRIGEZ CES PROBLÈMES AVANT DE CONTINUER');
}

console.log('\n' + '='.repeat(50));