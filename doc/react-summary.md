# React en quelques phrases

React c'est une librairie qui permet de coder des interfaces
pour les téléhones, navigateur etc ...

React est organisé en composant.

## Le CSS

- On peut créer un fichier CSS et 'importer

## Les modules CSS

- C'est fichier se terminant par ".module.css"
- Nous pouvons ensuite importer les classes de ce fichier

## Les Composants

- Une balise HTML
- Une fonction (Commmence avec une Majuscule, Retourne du JSX)
- Un fichier javascript

## Les Props

- Se sont les attributs de notre balise HTML
- C'est un objet
- C'est un objet que l'on vas destructuré

## Les Children

- Les enfants du composant (ex: `<h1>coucou</h1>` : coucou est l'enfant de h1)
- Il existe une props nommé "children" contenant les enfants

## Le State

- C'est une variable avec un fonction pour change se valeur
- Cette variable est synchronisé avec l'interface (l'affichage)
- il faut importer useState à partir de react
- nous pouvons créer un state comme ceci : `const [counter, setCounter] = useState(0)`
- Dans un composant c'est la seule solution pour créer des variables
  (il est impossible de faire : `const name = ''`)

## Les Event Handler

- Ce sont des actions
- Ce sont des props qui commence par "on" (ex: onClick, onChange, onSubmit ...)
- Ces props (onClick) accépte une fonction
- Cette fonction se lance lors de l'événement
- Cette fonction accépte (ou pas) un "event"
- Graçe à cette "event" nous pouvons arréter le bubbling (`event.stopPropagation()`)
- Graçe à cette "event" nous pouvons annuler le comportement défaut (`event.preventDefault()`)
- Graçe à cette "event" nous pouvons récupérer la cible (l'élément HTML qui à dclenché l'événement: `event.target`)
- Bonus, pour récupérer la valeur d'un input : `event.target.value`

## Les Effets

- Une fonction sans paramètre
- Un tableaux de dépendances :
  - Il permet de déterminer quand est ce que la fonction vas se lancer
  - Un tableaux vide `[]` permet de lancer la fonction lors de l'affichage
    du composant
  - Un tableaux avec à l'intérieur une variable (`[seconds]`) permet de
    lancer la fonction dès que la variable vas changer (si on as
    le tableaux `[seconds]`, la fonction se lancera à chaque changement
    de "seconds")
- Un effet c'est une fonction qui se déclenche à un changement de state
  précis
