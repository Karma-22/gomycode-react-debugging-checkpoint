# 🛠️ GoMyCode Bootcamp - Checkpoint Debugging React

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)]()
[![React-DevTools](https://img.shields.io/badge/React--DevTools-Audited-22c55e.svg)]()
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)]()
[![Student](https://img.shields.io/badge/Student-Karma--22%20(Darius%20Ange)-blue.svg)]()

> Projet réalisé dans le cadre du **Bootcamp Full Stack Software Developer de GoMyCode**.  
> Ce checkpoint met en pratique le diagnostic, l'inspection approfondie avec l'extension **React Developer Tools**, et la correction des anomalies courantes de State, Props, Keys et cycles de rendu en React.

---

## 📋 Table des Matières

- [Objectif du Checkpoint](#-objectif-du-checkpoint)
- [Cahier des Charges & Validation](#-cahier-des-charges--validation)
- [Structure du Projet](#-structure-du-projet)
- [Rapport d'Audit Résumé](#-rapport-daudit-résumé)
- [Mode Interactif Buggé vs Corrigé](#-mode-interactif-buggé-vs-corrigé)
- [Installation & Démarrage](#-installation--démarrage)
- [Auteur](#-auteur)

---

## 🎯 Objectif du Checkpoint

1. Déboguer une application React à l'aide de l'extension de navigateur **React Developer Tools**.
2. Inspecter la hiérarchie des composants, les valeurs du State et le passage des Props.
3. Identifier les causes profondes des dysfonctionnements (mutations illégales, clés instables, conversions de type, props undefined).
4. Fournir un rapport d'audit exhaustif ([DEBUGGING_REPORT.md](./DEBUGGING_REPORT.md)).
5. Intégrer un commutateur en direct permettant à l'évaluateur de reproduire et vérifier chaque bug et son correctif.

---

## ✅ Cahier des Charges & Validation

| Consigne GoMyCode | Réalisation | Statut |
| :--- | :--- | :---: |
| **Inspection avec React DevTools** | Arbre des composants audité, states et props examinés via l'inspecteur | ✅ Validé |
| **Identification des bugs** | 5 anomalies critiques identifiées et répertoriées | ✅ Validé |
| **Correction du code source** | Correction selon les standards d'immuabilité et de typage strict | ✅ Validé |
| **Rapport de débogage documenté** | Rédigé dans `DEBUGGING_REPORT.md` et visualisable directement dans l'UI | ✅ Validé |
| **Vérification du fonctionnement** | Zéro warning console, re-renders optimisés et prévisibles | ✅ Validé |

---

## 📁 Structure du Projet

```text
06-react-debugging-checkpoint/
├── index.html                   # HTML avec polices Plus Jakarta Sans & JetBrains Mono
├── package.json                 # Dépendances (react, react-dom, react-bootstrap)
├── vite.config.js               # Configuration du bundler Vite
├── DEBUGGING_REPORT.md          # Rapport technique détaillé d'audit React DevTools
├── README.md                    # Documentation du projet
├── .gitignore                   # Exclusion de node_modules
└── src/
    ├── components/
    │   ├── Header.jsx           # En-tête avec commutateur Mode Buggé / Corrigé
    │   ├── CounterBuggyFixed.jsx # Démonstration Mutation d'état vs setCount
    │   ├── UserProfileProps.jsx # Démonstration Props manquantes & undefined
    │   ├── TodoListKeys.jsx     # Démonstration index vs clés uniques d'éléments
    │   ├── CartCalculator.jsx   # Démonstration coercition de type string/number
    │   └── ReportViewer.jsx     # Tableau d'affichage du rapport d'audit intégré
    ├── App.jsx / App.js         # Tableau de bord principal
    ├── index.jsx / index.js     # Point d'entrée React 18
    ├── App.css                  # Thème DevTools Dark Mode & Glassmorphism
    └── index.css                # Styles globaux
```

---

## 🔬 Rapport d'Audit Résumé

| # | Bug Identifié | Observation React DevTools | Solution Implémentée |
| :-: | :--- | :--- | :--- |
| **1** | **Mutation directe du State** | L'état ne déclenche aucun re-render visuel lors des clics | Remplacement par `setCount(prev => prev + 1)` |
| **2** | **Props non concordantes** | `props.userProfile === undefined` dans l'inspecteur | Normalisation des noms de props et déstructuration sécurisée |
| **3** | **Index comme clé de tableau** | Avertissement console et instabilité lors de la suppression | Remplacement par `key={item.id}` unique et stable |
| **4** | **Erreur de Coercition** | Le state discount apparaît sous forme de String (`"20"`) | Conversion explicite `Number(value)` avant le calcul |
| **5** | **Boucle infinie** | Le Profiler montre une cadence anormale de re-renders | Stabilisation des dépendances dans `useEffect` |

*Consultez le fichier complet [DEBUGGING_REPORT.md](./DEBUGGING_REPORT.md) pour les extraits de code et les explications architecturales.*

---

## 🚀 Installation & Démarrage

### 1. Cloner le dépôt
```bash
git clone https://github.com/Karma-22/gomycode-react-debugging-checkpoint.git
cd gomycode-react-debugging-checkpoint
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l'application
```bash
npm start
# ou :
npm run dev
```
Ouvrez votre navigateur à l'adresse indiquée (ex: `http://localhost:3004`). Vous pouvez ouvrir **React Developer Tools** (Touche F12 > Onglet Components) pour tester l'inspection en direct.

---

## 👨‍💻 Auteur

- **Étudiant** : Darius Ange (Karma-22)
- **GitHub** : [@Karma-22](https://github.com/Karma-22)
- **Formation** : Full Stack Software Developer - GoMyCode
