import logo from './logo.svg'
import './App.css'

/**
 * En react nous écrivons du HTML qui se nomme le **JSX**.
 *
 * Une balise HTML correspond à un composant JSX.
 *
 * Un composant JSX c'est une fonction qui commence par
 * une majuscule et qui retourne du JSX !
 *
 * Les attributs d'une balise HTML sont les « props » du composant
 *
 * Chaque fonction composant accèpte un seul argument (ou paramètre) :
 * L'objet qui contient toutes les props
 */

const add = (x, y) => x + y

function AfficherNote(props) {
  return <li>Note : {props.note} / 20</li>
}

function Titre(props) {
  return (
    <h1>
      Bonjour {props.name}, votre age {props.age} ans
    </h1>
  )
}

function App() {
  const name = 'Rose Doe'
  const notes = [12.5, 8, 17, 9]

  return (
    <div>
      <Titre name={name} age='14' />
      <p>Ma première application react</p>
      <ul>
        {notes.map(note => (
          <AfficherNote note={note} />
        ))}
      </ul>
    </div>
  )
}

export default App
