# Guide de Déploiement sur Vercel

## 🚀 Méthode 1 : Via l'Interface Web Vercel (Recommandé)

### Étape 1 : Créer un compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up"
3. Connectez-vous avec GitHub, GitLab ou Email

### Étape 2 : Préparer votre projet
1. Créez un compte GitHub si vous n'en avez pas
2. Créez un nouveau repository sur GitHub
3. Téléchargez Git depuis [git-scm.com](https://git-scm.com) si pas déjà installé

### Étape 3 : Mettre votre projet sur GitHub
Ouvrez PowerShell ou Terminal dans le dossier `C:\Users\oussz\Desktop\port` et exécutez :

```bash
git init
git add .
git commit -m "Initial commit - Portfolio"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
git push -u origin main
```

### Étape 4 : Déployer sur Vercel
1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Cliquez sur "Import Git Repository"
3. Sélectionnez votre repository GitHub
4. Vercel détectera automatiquement que c'est un site statique
5. Cliquez sur "Deploy"
6. Attendez quelques secondes... Votre site est en ligne ! 🎉

---

## 🚀 Méthode 2 : Via la CLI Vercel (Ligne de commande)

### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2 : Se connecter à Vercel
```bash
vercel login
```

### Étape 3 : Déployer
Dans le dossier de votre projet (`C:\Users\oussz\Desktop\port`) :
```bash
vercel
```

Suivez les instructions :
- Configure project? **Y** (Yes)
- Which scope? Choisissez votre compte
- Link to existing project? **N** (No)
- Project name? **portfolio** (ou le nom que vous voulez)
- Directory? **.** (point = dossier actuel)

### Étape 4 : Déployer en production
```bash
vercel --prod
```

---

## 📝 Points importants

### ✅ Avant de déployer
- Vérifiez que tous les fichiers sont présents
- Testez le site en local (ouvrez `index.html` dans le navigateur)
- Assurez-vous que les images sont dans le bon chemin

### 📁 Structure des fichiers
```
port/
├── index.html
├── styles.css
├── script.js
├── vercel.json
├── images/
│   ├── skills/
│   │   ├── html.svg
│   │   ├── css.svg
│   │   └── ...
│   └── profile.jpg (si vous avez votre photo)
└── .gitignore
```

### 🔗 Après le déploiement
- Vous obtiendrez une URL comme : `votre-projet.vercel.app`
- Vous pouvez ajouter un nom de domaine personnalisé gratuitement
- Les mises à jour : chaque push sur GitHub redéploiera automatiquement

### 🎨 Personnalisation
- Allez dans les paramètres de votre projet sur Vercel
- Vous pouvez changer le nom de domaine
- Configurez les variables d'environnement si nécessaire

---

## ❓ Problèmes courants

### Les images ne s'affichent pas
- Vérifiez que les chemins sont relatifs (ex: `images/skills/html.svg`)
- Assurez-vous que tous les fichiers images sont dans le repository

### Le site ne se charge pas
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que `index.html` est à la racine du projet

### Mise à jour ne fonctionne pas
- Vérifiez que vous avez bien fait `git push`
- Vercel redéploie automatiquement après chaque push

---

## 🎉 C'est prêt !

Votre portfolio sera accessible publiquement avec une URL Vercel. Partagez-le avec le monde ! 🌍


