# 📁 GUIDE FILEZILLA - Armateurs du Saint-Laurent

## 🚀 ÉTAPES SIMPLES (5 minutes)

### 1. Préparer les fichiers

**Windows :**
```
Double-cliquez sur: UPLOADER-FILEZILLA.bat
```

**Mac/Linux :**
```bash
chmod +x UPLOADER-FILEZILLA.sh
./UPLOADER-FILEZILLA.sh
```

Un dossier `dist/` sera créé avec tous vos fichiers prêts.

### 2. Ouvrir FileZilla

1. **Lancez FileZilla**
2. **Connectez-vous à votre serveur** avec vos identifiants habituels
3. **Naviguez** vers le dossier racine de votre site web

### 3. Nettoyer le serveur

🚨 **CRITIQUE** : Supprimez TOUT le contenu actuel sur votre serveur

**Sélectionnez tout** (Ctrl+A ou Cmd+A) dans la partie droite de FileZilla
**Supprimez** (touche Suppr ou clic droit → Supprimer)

### 4. Uploader les nouveaux fichiers

1. **À gauche** (votre ordinateur) : Naviguez vers le dossier `dist/`
2. **Sélectionnez TOUT** le contenu du dossier `dist/` (pas le dossier lui-même)
3. **Glissez-déposez** vers la partie droite (votre serveur)

### 5. Vérifier l'upload

Assurez-vous que ces fichiers sont présents sur votre serveur :
- ✅ `index.html`
- ✅ `.htaccess`
- ✅ Dossier `assets/` (avec sous-dossiers)
- ✅ `site.webmanifest`
- ✅ `robots.txt`

### 6. Tester

Allez sur **https://www.armateurs.ca/** dans votre navigateur.

---

## 🆘 PROBLÈMES COURANTS

### ❌ "Le site ne charge pas"
**Solution :** Vérifiez que le fichier `.htaccess` est bien uploadé

### ❌ "Page blanche"
**Solution :** Rechargez la page (Ctrl+F5) et vérifiez la console (F12)

### ❌ "Erreur 404 sur les pages"
**Solution :** Votre serveur ne supporte peut-être pas les fichiers `.htaccess`
Contactez votre hébergeur.

### ❌ "Images ne se chargent pas"
**Solution :** Vérifiez que le dossier `assets/` est complètement uploadé

---

## 📋 CHECKLIST FINAL

- [ ] Script UPLOADER-FILEZILLA exécuté avec succès
- [ ] Dossier `dist/` créé sur votre ordinateur
- [ ] Connexion FileZilla établie
- [ ] Ancien contenu du serveur supprimé
- [ ] Contenu de `dist/` uploadé sur le serveur
- [ ] Fichier `.htaccess` présent sur le serveur
- [ ] Site testé sur https://www.armateurs.ca/

🎉 **Votre site est maintenant en ligne !**

---

## 💡 CONSEILS

- **Temps d'upload** : 2-5 minutes selon votre connexion
- **Taille totale** : Environ 5-15 MB
- **Pour les mises à jour futures** : Répétez simplement ces étapes

**Support :** Si le problème persiste, vérifiez que votre hébergeur supporte :
- Les Single Page Applications (SPA)
- Les fichiers `.htaccess`
- La réécriture d'URL (URL rewriting)