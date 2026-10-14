# 🔍 Rapport d'Audit & Débogage React (React Developer Tools)

**Étudiant** : Darius Ange (Karma-22)  
**Formation** : Full Stack Software Developer Bootcamp - GoMyCode  
**Checkpoint** : Checkpoint Debugging React  
**Outils utilisés** : React Developer Tools (Extension Chrome), Profiler, Components Tree Inspector, Vite HMR, Console DevTools.

---

## 🎯 Objectif de la Mission

L'objectif de ce point de contrôle est d'auditer, diagnostiquer et corriger une application React présentant des anomalies de fonctionnement au niveau de la gestion de l'état local (`state`), du passage d'accessoires (`props`), de la réconciliation du DOM virtuel (`key props`), du typage des données et des cycles de vie.

---

## 📋 Synthèse des Anomalies Diagnostiquées et Résolues

| # | Anomalie Diagnostiquée | Outil de Détection (React DevTools) | Cause Racine Identifiée | Solution Implémentée |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Mutation directe de l'état** (State Direct Mutation) | *Components Tab* : L'état ne déclenche aucun re-render visuel lors des clics | Incrémentation directe de variable sans passer par le setter `setState` / `setCount` | Utilisation de `setCount(prev => prev + 1)` garantissant l'immuabilité et la notification de React |
| **2** | **Props non concordantes / Undefined** | *Components Inspector* : `props.userProfile === undefined` alors que le parent passe `props.userData` | Mauvaise dénomination d'attribut JSX entre le parent et l'enfant | Harmonisation du nom de prop, ajout de valeurs par défaut (`defaultProps`) et chaînage optionnel (`?.`) |
| **3** | **Index de tableau utilisé comme Clé** (`key={index}`) | *Console Tab* : Warning `Each child in a list should have a unique 'key' prop` | En cas de suppression ou de filtrage, React réutilise le nœud DOM du mauvais index | Remplacement par un identifiant persistant et stable `key={item.id}` |
| **4** | **Erreur de Coercition de Type** (String vs Number) | *Props/State Inspector* : La valeur du champ apparaît entre guillemets `"20"` au lieu du type numérique `20` | `event.target.value` dans les inputs HTML renvoie toujours une chaîne de caractères | Conversion explicite avec `Number(value)` ou `parseFloat(value)` avant tout calcul arithmétique |
| **5** | **Boucle de Rendu Infinie** (Infinite Loop in Effect) | *Profiler Tab* : Montée en flèche du nombre de rendus par seconde (`Maximum update depth exceeded`) | Appel d'un setter d'état dans `useEffect` sans tableau de dépendances | Définition stricte du tableau de dépendances `[deps]` ou `[]` pour exécution au montage uniquement |

---

## 🔬 Études de Cas Détaillées

### Cas 1 : Mutation Directe du State
- **Symptôme** : L'utilisateur clique sur le bouton "Incrémenter", mais le chiffre affiché à l'écran reste bloqué à zéro, alors que la variable en mémoire augmente.
- **Diagnostic avec React DevTools** : Dans l'onglet *Components*, le composant `Counter` ne clignote pas (aucun re-render). L'inspection du State montre que React n'a pas été notifié du changement car l'adresse mémoire de l'objet est restée inchangée.
- **Code Buggé** :
  ```javascript
  // ❌ ERREUR : Mutation directe
  count = count + 1;
  ```
- **Code Corrigé** :
  ```javascript
  // ✅ SOLUTION : Setter fonctionnel immuable
  setCount((prevCount) => prevCount + 1);
  ```

---

### Cas 2 : Props Manquantes et Crash de Rendu
- **Symptôme** : Crash de l'application avec le message d'erreur : `TypeError: Cannot read properties of undefined (reading 'name')`.
- **Diagnostic avec React DevTools** : En cliquant sur le composant `UserProfile` dans l'arbre React DevTools, le panneau latéral des Props affiche :
  ```json
  props: {
    userData: { name: "Darius", role: "Dev" }
  }
  ```
  Or le code source tente de lire `props.userProfile.name`.
- **Code Corrigé** :
  ```javascript
  // ✅ SOLUTION : Déstructuration avec fallback et chaînage optionnel
  const UserProfile = ({ user = {} }) => {
    return <h5>{user?.name || "Invité"}</h5>;
  };
  ```

---

### Cas 3 : Clés de Réconciliation Virtuelle (Keys)
- **Symptôme** : Lorsqu'un utilisateur supprime la première tâche d'une liste Todo, c'est visuellement la dernière tâche qui semble disparaître ou les cases à cocher restent associées au mauvais texte.
- **Diagnostic avec React DevTools** : En observant l'arbre DOM Virtuel lors d'une suppression, React compare `key="0"`, `key="1"`, etc. Comme l'élément suivant hérite de la clé `key="0"`, React réutilise son état local sans le redessiner.
- **Code Corrigé** :
  ```javascript
  // ✅ SOLUTION : Clé unique et immuable basée sur l'ID de la donnée
  {items.map((item) => (
    <TodoItem key={item.id} item={item} />
  ))}
  ```

---

### Cas 4 : Coercition de Type et Concaténation Involontaire
- **Symptôme** : Un produit à 100 € avec 20 € de frais additionnels affiche un total de `10020 €` au lieu de `120 €`.
- **Diagnostic avec React DevTools** : L'inspection du state montre `state.discount: "20"` (type string). L'opérateur `+` effectue donc une concaténation au lieu d'une addition.
- **Code Corrigé** :
  ```javascript
  // ✅ SOLUTION : Conversion explicite
  const total = Number(basePrice) + Number(discount);
  ```

---

## 🚀 Conclusion de l'Audit

Grâce à l'utilisation méthodique de **React Developer Tools** :
1. Chaque composant est désormais totalement prévisible et respecte les règles d'or de l'immuabilité React.
2. Tous les warnings console ont été éliminés.
3. L'application intègre un mode interactif permettant d'alterner entre l'état buggé d'origine et la version corrigée pour fin de démonstration pédagogique.
