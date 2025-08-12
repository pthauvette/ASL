# 🚨 GUIDE DE DÉPLOIEMENT URGENT

## Votre site ne fonctionne pas ? Suivez ces étapes EXACTEMENT :

### 1. 🔄 Build de Production (OBLIGATOIRE)

```bash
# Exécutez UNE de ces commandes sur votre machine :

# Windows :
build.bat

# Mac/Linux :
chmod +x build.sh && ./build.sh

# Ou manuellement :
npm install && npm run build
```

**⚠️ IMPORTANT :** Un dossier `dist/` doit être créé avec tous vos fichiers optimisés.

### 2. 🗑️ Nettoyage Serveur

Avec FileZilla ou votre gestionnaire de fichiers :
1. **SUPPRIMEZ TOUT** le contenu actuel de votre serveur
2. Votre dossier web doit être complètement vide

### 3. 📤 Upload Correct

**UPLOADEZ UNIQUEMENT** le contenu du dossier `dist/` :
- ✅ `index.html`
- ✅ `.htaccess` 
- ✅ Dossier `assets/`
- ✅ `site.webmanifest`
- ✅ `robots.txt`

**❌ N'UPLOADEZ PAS :**
- `src/`
- `node_modules/`
- `package.json`
- `.env` ou autres fichiers de développement

### 4. ✅ Test Final

1. Allez sur https://www.armateurs.ca/
2. La page doit s'afficher
3. Testez la navigation

## 🆘 Problème Persistant ?

### Test Rapide
1. Uploadez le fichier `test.html` (inclus) sur votre serveur
2. Allez sur https://www.armateurs.ca/test.html
3. Si ça s'affiche, votre serveur fonctionne
4. Supprimez `test.html` et refaites le build

### Erreurs Communes

**Écran blanc :**
- Vous avez uploadé les mauvais fichiers
- Solution : Recommencez l'étape 1-3

**Erreur 404 sur les pages :**
- Le fichier `.htaccess` manque
- Solution : Vérifiez qu'il est bien uploadé

**Ressources non trouvées :**
- Le dossier `assets/` manque
- Solution : Re-uploadez tout le contenu de `dist/`

---

**⏱️ Temps de résolution : 10 minutes maximum**

Si ça ne marche toujours pas après ces étapes, contactez votre hébergeur pour vérifier que :
- Le serveur supporte les applications React
- Les fichiers `.htaccess` sont autorisés
- La réécriture d'URL (URL rewriting) est activée