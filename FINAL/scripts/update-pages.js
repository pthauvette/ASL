// Script pour ajouter automatiquement le fichier animations.css à toutes les pages HTML
// Ce script peut être exécuté dans Node.js pour mettre à jour en lot

const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'association.html',
    'conditions-utilisation.html',
    'connexion.html',
    'contact.html',
    'dossiers.html',
    'evenements.html',
    'inscription.html',
    'membres.html',
    'plan-site.html',
    'politique-confidentialite.html',
    'saint-laurent.html'
];

// Fonction pour ajouter le lien CSS animations.css
function addAnimationsCSS(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Vérifier si le fichier animations.css est déjà inclus
        if (content.includes('animations.css')) {
            console.log(`✅ ${filePath} - animations.css déjà inclus`);
            return;
        }
        
        // Chercher la ligne avec main.css et ajouter animations.css après
        const mainCSSLine = '<link rel="stylesheet" href="styles/main.css">';
        const animationsCSSLine = '<link rel="stylesheet" href="styles/animations.css">';
        
        if (content.includes(mainCSSLine)) {
            const updatedContent = content.replace(
                mainCSSLine,
                mainCSSLine + '\n    ' + animationsCSSLine
            );
            
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ ${filePath} - animations.css ajouté avec succès`);
        } else {
            console.log(`⚠️ ${filePath} - main.css non trouvé, ajout manuel requis`);
        }
    } catch (error) {
        console.error(`❌ Erreur lors du traitement de ${filePath}:`, error.message);
    }
}

// Instructions d'utilisation
console.log('🚀 Script de mise à jour des pages HTML pour animations.css');
console.log('📝 Instructions pour mise à jour manuelle:');
console.log('1. Ouvrir chaque fichier HTML');
console.log('2. Trouver la ligne: <link rel="stylesheet" href="styles/main.css">');
console.log('3. Ajouter après: <link rel="stylesheet" href="styles/animations.css">');
console.log('');

htmlFiles.forEach(file => {
    console.log(`🔧 Mise à jour nécessaire pour: ${file}`);
});

console.log('');
console.log('💡 Les pages suivantes ont déjà été mises à jour:');
console.log('✅ index.html');

// Export pour utilisation manuelle
module.exports = {
    htmlFiles,
    addAnimationsCSS
};