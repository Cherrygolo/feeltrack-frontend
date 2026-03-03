# FeelTrack

Application de gestion et de suivi des avis (reviews) construite avec Angular 21, utilisant une architecture modulaire et les standards modernes du framework.

## 📋 Table des matières

- [À propos](#à-propos)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Technologies](#technologies)
- [Scripts disponibles](#scripts-disponibles)
- [Contribution](#contribution)

## À propos

**FeelTrack** est une application web permettant de créer, afficher et gérer des avis sur différents services ou produits. Le projet utilise une architecture orientée fonctionnalités avec Angular 21 et des composants autonomes (standalone components).

> **ℹ️ Note** : Il s'agit de l'application **frontend** de FeelTrack. Elle communique avec le backend disponible à : [github.com/Cherrygolo/sa-backend](https://github.com/Cherrygolo/sa-backend)

### Fonctionnalités principales
- 📝 Création d'avis avec formulaire intuitif
- 📋 Affichage d'une liste d'avis
- 🎨 Interface responsive et moderne
- 🔄 Gestion d'état réactive avec RxJS
- 🔌 Communication avec l'API backend

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 20+ (inclus npm 11+)
- **Angular CLI** version 21.1.4+ : `npm install -g @angular/cli@21`

Vérifiez vos installations :
```bash
node --version    # v20.x.x ou supérieur
npm --version     # 11.x.x ou supérieur
ng version        # Angular CLI: 21.1.4
```

## Installation

1. **Cloner le repository** (ou extraire le projet)
```bash
cd feel-track
```

2. **Installer les dépendances**
```bash
npm install
```

## Utilisation

### Démarrer le serveur de développement

```bash
npm start
```

ou directement :
```bash
ng serve
```

Le serveur démarre à `http://localhost:4200/`. L'application se rechargera automatiquement lors de modifications des fichiers source.

### Générer un nouveau composant

```bash
ng generate component nom-du-composant
```

Pour plus d'options :
```bash
ng generate --help
```

### Compiler pour la production

```bash
npm run build
```

Les artefacts compilés seront stockés dans le répertoire `dist/`. La compilation optimise automatiquement l'application pour les performances.

### Exécuter les tests unitaires

```bash
npm test
```

La suite de tests utilise [Vitest](https://vitest.dev/) comme test runner.

### Mode watch pour le développement

```bash
npm run watch
```

Recompile l'application à chaque modification en mode développement.

## 📁 Structure du projet

```
src/
├── app/
│   ├── app.config.ts          # Configuration globale de l'application
│   ├── app.ts                 # Composant racine (root component)
│   ├── app.routes.ts          # Routes de l'application
│   ├── app.html               # Template du composant racine
│   ├── app.scss               # Styles globaux du composant
│   │
│   ├── core/                  # Services et logique métier
│   ├── layout/                # Composants de mise en page
│   │   └── main-layout/       # Layout principal
│   │
│   ├── features/              # Fonctionnalités métier
│   │   └── reviews/           # Module des avis
│   │       ├── review.routes.ts
│   │       ├── components/    # Composants réutilisables
│   │       │   └── review-card/
│   │       └── pages/         # Pages métier
│   │           ├── review-list/
│   │           └── review-creation-form/
│   │
│   └── shared/                # Composants et services partagés
│
├── styles/                    # Styles globaux réutilisables
│   └── _variables.scss        # Variables SCSS (couleurs, espacements, etc.)
│
├── main.ts                    # Point d'entrée de l'application
├── index.html                 # Fichier HTML principal
└── styles.scss                # Styles globaux
```

### Conventions de nommage

- **Composants** : `kebab-case` (ex: `review-card.component.ts`)
- **Dossiers** : `kebab-case` (ex: `review-list/`)
- **Classes** : `PascalCase` (ex: `ReviewCardComponent`)
- **Variables/Functions** : `camelCase` (ex: `onReviewSubmit()`)

## 🛠️ Technologies

| Technologie | Version | Usage |
|-----------|---------|-------|
| **Angular** | 21.1.0 | Framework principal |
| **TypeScript** | ~5.9.2 | Langage de programmation |
| **RxJS** | ~7.8.0 | Programmation réactive |
| **SCSS** | - | Préprocesseur CSS |
| **Vitest** | - | Framework de test |
| **Prettier** | - | Formatteur de code |

## 🏗️ Architecture

### Frontend-Backend

Cette application frontend communique avec le backend FeelTrack pour gérer les avis disponibles à :

**[Backend FeelTrack](https://github.com/Cherrygolo/sa-backend)**

Le frontend envoie des requêtes HTTP vers l'API backend pour :
- Récupérer la liste des avis existants
- Créer de nouveaux avis

Assurez-vous que le serveur backend est en cours d'exécution pour que l'application fonctionne correctement.

## 📝 Scripts disponibles

| Commande | Description |
|----------|------------|
| `npm start` | Lance le serveur de développement |
| `npm run build` | Compile pour la production |
| `npm run watch` | Compile en mode watch |
| `npm test` | Exécute les tests unitaires |
| `npm run ng` | Accès direct à Angular CLI |

## 📐 Configuration

### Prettier

Le projet utilise **Prettier** pour la formatting du code avec les paramètres suivants :
- Largeur de ligne : 100 caractères
- Guillemets simples
- Parser Angular pour les fichiers HTML

### Angular CLI

Schematics configurés dans `angular.json` :
- Style : **SCSS**
- Tests : Désactivés par défaut (à activer manuellement)

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Créer une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonction`)
2. Commiter vos changements (`git commit -am 'Ajouter une fonctionnalité'`)
3. Pousser vers la branche (`git push origin feature/ma-fonction`)
4. Ouvrir une Pull Request

### Standards de code

- Suivre les conventions de nommage indiquées ci-dessus
- Respecter la structure modulaire du projet
- Ajouter des tests unitaires pour les nouvelles fonctionnalités
- Utiliser `ng generate` pour créer les nouveaux éléments
- Formater le code avec Prettier

## 📄 License

Veuillez consulter le fichier LICENSE pour plus de détails sur la licence de ce projet.

---

**Besoin d'aide ?** Consultez la [documentation officielle Angular](https://angular.dev) ou le [guide CLI Angular](https://angular.dev/tools/cli).
