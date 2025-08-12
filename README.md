# 🚢 Armateurs du Saint-Laurent

Application web complète pour l'Association des Armateurs du Saint-Laurent, incluant un site vitrine, un processus d'inscription et un portail membre.

## ✨ Fonctionnalités

### Site Public
- **Page d'accueil** avec présentation de l'association
- **Pages informatives** (Association, Saint-Laurent, Contact)
- **Répertoire public** des membres
- **Calendrier** des événements publics
- **Design responsive** adapté mobile/desktop

### Processus d'Inscription
- **6 étapes guidées** pour l'adhésion
- **Intégration API Membri 365** pour la gestion
- **Validation en temps réel** des formulaires
- **Mode démonstration** robuste
- **Sauvegarde automatique** du progrès

### Portail Membre
- **Authentification sécurisée** avec Supabase
- **Tableau de bord** personnalisé
- **Répertoire complet** des membres
- **Système de messagerie** interne
- **Gestion des connexions** réseau
- **Calendrier d'événements** avec inscriptions
- **Notifications** en temps réel
- **Gestion de profil** complète

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript
- **Styling** : Tailwind CSS v4 + Radix UI
- **Animation** : Motion (ex-Framer Motion)
- **Backend** : Supabase (Auth, Database, Storage)
- **API** : Intégration Membri 365
- **Build** : Vite
- **Déploiement** : Apache (avec .htaccess)

## 🚀 Déploiement

### Prérequis
- Node.js 18+ installé
- Connexion internet pour les dépendances

### Instructions

1. **Générer le build de production :**

   **Windows :**
   ```bash
   BUILD-PRODUCTION.bat
   ```

   **Mac/Linux :**
   ```bash
   chmod +x BUILD-PRODUCTION.sh
   ./BUILD-PRODUCTION.sh
   ```

2. **Déployer :**
   - Ouvrez FileZilla
   - Connectez-vous à votre serveur
   - Supprimez tout le contenu du serveur
   - Uploadez tout le contenu du dossier `dist/`

3. **Tester :**
   - Visitez https://www.armateurs.ca/
   - Vérifiez toutes les fonctionnalités

## 🔧 Configuration

### Variables d'Environnement
Créez un fichier `.env.production` :

```env
VITE_MEMBRI_API_URL=https://api.membri365.com
VITE_MEMBRI_SCODE=votre_scode
VITE_MEMBRI_ORG=votre_org_id
VITE_SUPABASE_URL=votre_supabase_url
VITE_SUPABASE_ANON_KEY=votre_supabase_key
```

### Mode Démonstration
L'application fonctionne automatiquement en mode démo si :
- Les APIs externes ne sont pas disponibles
- Les variables d'environnement ne sont pas configurées
- Une erreur de connexion survient

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Responsive mobile/tablet/desktop
- ✅ PWA ready
- ✅ SEO optimisé
- ✅ Accessibilité WCAG 2.1

## 🎯 Architecture

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants UI réutilisables
│   ├── member/         # Composants du portail membre
│   └── ...             # Pages et composants spécifiques
├── utils/              # Utilitaires et contextes
├── styles/             # Styles globaux Tailwind
└── App.tsx            # Composant racine
```

## 📧 Support

Pour toute question technique ou fonctionnelle, contactez l'équipe de développement.

---

**© 2024 Armateurs du Saint-Laurent - Tous droits réservés**