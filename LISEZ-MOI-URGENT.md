# 🚨 URGENT - Armateurs du Saint-Laurent

## Votre site ne fonctionne pas ? Voici LA solution !

### ⚡ SOLUTION EXPRESS (10 minutes)

1. **Double-cliquez** sur `UPLOADER-FILEZILLA.bat` (Windows) ou exécutez `./UPLOADER-FILEZILLA.sh` (Mac/Linux)

2. **Attendez** que le script finisse (il va installer, compiler et préparer tout)

3. **Ouvrez FileZilla** et connectez-vous à votre serveur

4. **SUPPRIMEZ TOUT** sur votre serveur (sélectionnez tout → Supprimer)

5. **Allez dans le dossier `dist`** sur votre ordinateur

6. **Sélectionnez TOUT** dans `dist` et **glissez-déposez** vers votre serveur

7. **Testez** : https://www.armateurs.ca/

**C'EST TOUT ! Votre site sera en ligne.**

---

### 🔍 Vérification rapide

Avant de commencer, vous pouvez vérifier que tout est prêt :
```bash
npm run verifier
```

---

### 📁 Fichiers créés pour vous aider

- `UPLOADER-FILEZILLA.bat` / `.sh` : Script automatique
- `GUIDE-FILEZILLA.md` : Guide détaillé avec captures
- `SOLUTION-SIMPLE.txt` : Instructions ultra-simples
- `verifier.js` : Vérificateur de projet

---

### 🎯 Résultat attendu

Après l'upload, vous devriez avoir sur votre serveur :
- `index.html`
- `.htaccess`
- Dossier `assets/` (avec CSS, JS, images)
- `site.webmanifest`
- `robots.txt`

---

### 🆘 Problème persistant ?

1. **Vérifiez la console** du navigateur (F12) pour les erreurs
2. **Contactez votre hébergeur** pour vérifier le support des SPA
3. **Assurez-vous** que les fichiers `.htaccess` sont autorisés

---

**🕐 Temps total : 10 minutes maximum**  
**🎉 Résultat : Site fonctionnel sur https://www.armateurs.ca/**