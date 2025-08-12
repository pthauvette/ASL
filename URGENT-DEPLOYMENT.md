# 🚨 CORRECTION URGENTE - www.armateurs.ca

## ⚡ Solution Immédiate (5 minutes)

### Étape 1: Build de Production
```bash
# Sur votre machine de développement:

# Option A: Linux/Mac
chmod +x build.sh
./build.sh

# Option B: Windows
build.bat

# Option C: Manuel
npm install
npm run build
```

### Étape 2: Upload Correct
**🔴 CRITIQUE: Supprimez d'abord TOUT le contenu actuel de votre serveur**

Avec FileZilla:
1. **Sélectionnez et supprimez TOUS les fichiers** sur le serveur
2. **Uploadez UNIQUEMENT** le contenu du dossier `dist/` généré
3. **Vérifiez** que le fichier `.htaccess` est bien uploadé

### Étape 3: Vérification
- ✅ Accédez à https://www.armateurs.ca/
- ✅ La page d'accueil doit s'afficher
- ✅ La navigation doit fonctionner

## 🔍 Diagnostic Rapide

### Si le site est encore blanc:

1. **Ouvrez la console du navigateur** (F12 → Console)
2. **Cherchez les erreurs** en rouge
3. **Vérifiez l'onglet Network** pour les erreurs 404

### Erreurs communes et solutions:

#### Erreur: "Failed to load module"
**Solution**: Vous avez uploadé les fichiers source au lieu du build
- Supprimez tout et uploadez `dist/` seulement

#### Erreur: "Cannot GET /quelque-page"
**Solution**: Problème de configuration serveur
- Vérifiez que `.htaccess` est présent
- Ou ajoutez la configuration Nginx

#### Erreur: "Mixed Content" ou ressources non chargées
**Solution**: Problème de chemins
- Vérifiez que tous les fichiers dans `dist/` sont uploadés

## 📋 Checklist de Déploiement

### ✅ Avant upload:
- [ ] `npm run build` exécuté avec succès
- [ ] Dossier `dist/` créé
- [ ] Fichier `dist/.htaccess` présent
- [ ] Taille du dossier `dist/` raisonnable (quelques MB)

### ✅ Sur le serveur:
- [ ] Ancien contenu supprimé
- [ ] Contenu de `dist/` uploadé
- [ ] Fichier `.htaccess` présent
- [ ] Permissions correctes (755 pour dossiers, 644 pour fichiers)

### ✅ Test final:
- [ ] https://www.armateurs.ca/ charge
- [ ] Menu navigation fonctionne
- [ ] Pas d'erreurs dans la console
- [ ] Images et styles chargés

## 🆘 Support Urgent

Si le problème persiste après ces étapes:

### 1. Vérifiez les logs d'erreur du serveur
```bash
# Sur votre serveur (si vous avez accès SSH):
tail -f /var/log/apache2/error.log
# ou
tail -f /var/log/nginx/error.log
```

### 2. Testez localement
```bash
# Sur votre machine:
npm run preview
# Ouvrez http://localhost:4173
```

Si ça marche localement mais pas sur le serveur, c'est un problème de déploiement.

### 3. Configuration Nginx (si pas Apache)
```nginx
server {
    listen 80;
    server_name www.armateurs.ca armateurs.ca;
    root /path/to/your/dist/folder;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4. Permissions de fichiers
```bash
# Sur le serveur:
chmod -R 755 /path/to/website/
chmod 644 /path/to/website/*.html
chmod 644 /path/to/website/.htaccess
```

## 📞 Contact d'Urgence

Si rien ne fonctionne:
1. Prenez des captures d'écran des erreurs de console
2. Vérifiez que votre serveur supporte les SPA (Single Page Applications)
3. Contactez votre hébergeur pour vérifier la configuration Apache/Nginx

---

**⏰ Temps estimé de résolution: 5-15 minutes**  
**🎯 Objectif: Site fonctionnel sur https://www.armateurs.ca/**