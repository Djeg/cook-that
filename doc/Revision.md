## Révision Javascript

Javascript est un langage de programmation orientée objet par prototype.

### 1. Les variables

Les variables des données que l'on concerve en mémoire.
Ces données elles possèdent un identifiant, et une valeur
associé à un type.

Pour déclarer une variable je JS, nous avons 3 manières
différentes.

```js
var age = 34
let name = 'Jean'
const surname = 'Jeannot'
```

Chaque variable possède un type :

```js
const age = 34 // int (entier, tout les chiffres sans virgule)
const price = 4.56 // float (flottant, tout les chiffres avec virgule)
const isMajeur = true // boolean (vrai ou faux)
const name = 'Jean' // string (Chaine de caractère)
const notes = [6.5, 16, 5, 17, 18.5] // array (tableaux de valeurs)
const eleve = {
  // object (Les objets en javascript)
  firstname: 'Jean',
  lastname: 'Dupont',
  notes: [17, 14, 8.9],
}
const test = undefined
const test2 = null
```

Nous pouvons utiliser des opérateurs sur nos variables :

```js
// Ici, + pour l'addition, / pour diviser
const moyenne = (12 + 14) / 2

// La concaténation c'est l'addition de chaine de caractères
const firstname = 'Jean'
const lastname = 'Dupont'
const nomComplet = firstname + ' ' + lastname // 'Jean Dupont'
// Un chaine de caractère avec interpolation
const fullname = `Coucou ${firstname} ${lastname}` // 'Coucou Jean Dupont'
```

### 2. Les conditions

C'est la possibilité de pouvoir éxécuter du code sous certaines
conditions :

```js
const age = 34

if (age > 35) {
  console.log(`J'ai plus de 35 ans`)
} else {
  console.log(`J'ai moins de 35 ans`)
}

// Les opérateurs de conditions :
// > (plus grand que)
// < (plus petit que)
// >= (supérieur ou égale)
// <= (inférieur ou égale)
// == (égale à)
// === (identique à)
// != (n'est pas égale à)
// !== (n'est pas identique à)
// && (et)
// || (ou)

// Les conditions ternaire :
// Si age > 35, alors (?) `J'ai plus de 35 ans` sinon (:) `J'ai moins de 35 ans`
const sentence = age > 35 ? `J'ai plus de 35 ans` : `J'ai moins de 35 ans`

const age = 16
const sentence2 =
  age > 18
    ? age > 45
      ? `Je suis senior`
      : `Je suis majeur`
    : `Je suis ne suis pas majeur`
```

### 3. Les tableaux (array)

Un tableaux regroupe plusieurs valeurs

```js
const notes = [12.5, 8, 16, 19.5]

// Nous pouvons accèder à un élément du tableaux
// en utilisant son index (la position de l'élément
// dans le tableau en commencant par 0)
const premiereNote = notes[0]

console.log(notes[2]) // 16

const notes2 = [14.5, 17, 3]

// Nous pouvons concaténer des tableaux entre eux
// en utilisant le spread operator (...)
const toutLesNotes = [...notes, ...notes2] // [12.5, 8, 16, 19.5, 14.5, 17, 3]

console.log(toutLesNotes[5]) // 17

// Nous pouvons connaitre la taille d'un tableaux
notes.length // 4
toutLesNotes.length // 7

// Nous pouvons utiliser le "destrucuting argument" afin
// d'accèder plus facilement aux éléments de notre tableaux
const notes = [12.5, 8, 16, 19.5]

const [premierNote, deuxiemeNote, ...autresNotes] = notes

console.log(premierNote) // 12.5
console.log(deuxiemeNote) // 8
console.log(autreNotes) // [16, 19.5]
```

### 3. Les objets

Les objets se sont des dictionnaires de variables (record)

```js
const person = {
  firstname: 'Jean',
  lastname: 'Dupont',
}

const releveDeNote = {
  profPrincipal: 'Jean Luc Dupont',
  notes: [3.7, 14.5, 19],
}

// Nous pouvons accèder facilement à un élément d'un objet
console.log(person.firstname) // 'Jean'
console.log(person['firstname']) // 'Jean'

// Nous pouvons aussi assigner des nouvelles clefs
person.age = 35
person['age'] = 35

console.log(person.age) // 35

console.log(person.fullName) // undefined (non définie)

// Il est possible de fusioner des objets entre eux :
const eleve = { ...person, ...releveDeNote }

console.log(eleve.firstname) // 'Jean'
console.log(eleve.notes) // [3.7, 14.5, 19]

// Il est possible de desctructer un objet
const { notes, firstname, lastname, ...restEleve } = eleve

console.log(notes) // [3.7, 14.5, 19]
console.log(firstname) // 'Jean'
console.log(lastname) // 'Dupont'
console.log(restEleve) // { profPrincipal: 'Jean Luc Dupont' }
console.log(restEleve.profPrincipal) // 'Jean Luc Dupont'
```

### 4. Les fonctions

Les fonctions se sont des instructions réutilisable.

```js
function add(x, y) {
  const resultat = x + y

  return resultat
}

const total = add(5, 7) // 12

// Ici nous définissons une fonction anonyme
const substract = function (x, y) {
  return x - y
}

substract(4, 3) // 1

// Ici une fonction anonyme fléché
const multiply = (x, y) => {
  return x * y
}

multiply(2, 2) // 4

// Il est possible de créer des fonction anonyme fléché à une
// seule instruction
const multiply2 = (x, y) => x * y

const hello = name => `Coucou ${name}`

const isMajeur = age => (age > 18 ? 'Majeur' : 'Mineur')

hello('Jean') // 'Coucou Jean'

// Il est possible de définir des paramètres par défaut
const salutation = (name = 'Inconue') => `Salutation ${name}`

salutation('John') // Salutation John
salutation() // Salutation Inconue

// Il est possible de récupérer tout les paramètres d'une
// fonction en utilisant le spread operator
const superAddition = (...numbers) => {
  // numbers = [6, 2, 1, 10]
  let resultat = 0

  for (x of numbers) {
    resultat = resultat + x
  }

  return resultat
}

superAddition(6, 2, 1, 10) // 19

const eleve = {
  firstname: 'John',
  lastname: 'Doe',
  notes: [13.4, 18, 3],
  age: 14,
  classe: '4eme E',
}

const afficherEleve = eleve =>
  `${eleve.firstname} ${eleve.lastname} (${eleve.classe})`

const afficherEleve = ({ firstname, lastname, classe }) =>
  `${firstname} ${eleve.lastname} (${eleve.classe})`

afficherEleve(eleve) // 'John Doe (4eme E)'
```

### 5. Les méthodes

Les méthodes se sont des fonctions à l'intérieur d'objet.

#### Les chaînes de caractère

```js
// Les chaines de caractères
const name = 'John'

name // string (object)

// Taille de ma chaine de caractère
name.length // 4
// Transforme une chaine de caractère en majuscule
name.toUpperCase() // 'JOHN'
name.toLowerCase() // 'john'

const surname = '             jean luc        '

// Enlève les espaces de début et de fin
surname.trim() // 'jean luc'

const afficherName = name => name.trim().toUpperCase()

afficherName('     jean luc dupont ') // 'JEAN LUC DUPONT'
```

#### Les tableaux

```js
const notes = [12.5, 18, 9.6, 5]

// Map permet de boucler sur chaques élément de notre
// tableaux et retourne un nouveau tableau
const superNotes = notes.map(note => (note < 10 ? 10 : note))

notes // [12.5, 18, 9.6, 5] (array<float>)
superNotes // [12.5, 18, 10, 10] (array<float>)

const moyenne = notes.reduce((acc, note) => acc + note, 0) / note.length // 12.5,  30.5, 40.1, 45.1
```

### 6. Les promesses (promises)

Les promesses nous permettent de gérer **l'asynchrone**.

```js
const additioner = (x, y) => x + y

const additionerAsync = async (x, y) => x + y

const resultat1 = additioner(2, 2) // 4 (int)

const resultat2 = additionerAsync(2, 2) // Promise<4>

console.log(resultat1) // (int) 4

console.log(resultat2) // Promise

// Promise (en cours) (contient null)
// Promise terminé avec success (int 4)
// Promise terminé avec une erreur (Error)

resultat2.then(chiffre => console.log(chiffre)).catch(e => console.log(e))

const calculer = async x => {
  const resultat1 = await additionerAsync(x, 5) // resultat1 => 15 (int)
  const resultat2 = await additionerAsync(resultat1, 10) // resultat2 => 25 (int)

  return additionerAsync(resultat2, 5)
}

const totalPromise = calculer(10) // Promise

totalPromise.then(total => console.log(total)) // 30 (int)

const calculer2 = async x => {
  const [resultat1, resultat2] = await Promise.all([
    additionerAsync(x, 10),
    additionerAsync(x, 20),
  ]) // [12, 22]

  return resultat1 + resultat2 // 34
}

calculer2(2) // Promise

const attendre = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const test = async () => {
  await attendre(1000)
  console.log('coucou')
  await attendre(3000)
  console.log('les amis')
}
```

### 7. Les modules

En javascript il est possible de faire autant que l'on souhaite,
chaques fichiers est ce que l'on appel un **module**.

```js
// calculate.js
export const additionner = (x, y) => x + y

export const soustraire = (x, y) => x - y

const name = 'math'

export default name
```

```js
// index.js
import { additioner, soustraire } from './calculate.js'
import nomParDefaut from './calculate'

additioner(3, 4) // 7
soustraire(5, 2) // 3
console.log(nomParDefaut) // 'math'

import * as Mathematique from './calculate'

Mathematique.additioner(2, 4) // 6
Mathematique.soustraire(8, 4) // 4
console.log(Mathematique.default) // 'math'
```
