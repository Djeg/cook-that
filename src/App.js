import './App.css'
import React from 'react'
import Titre from './Titre'

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

function AfficherNote({ note }) {
  return <li>Note : {note} / 20</li>
}

function App() {
  const notes = [12.5, 19, 14, 9]

  return (
    <div>
      <Titre name='John' age='30' plop='plip' id='test'>
        <strong>
          Bonjour <i className='fas fa-heart'></i>
        </strong>
        <em>les amis</em>
      </Titre>
      <p>Ma première application react</p>
      <ul>
        {notes.map((note, index) => (
          <AfficherNote key={`note-${index}`} note={note} />
        ))}
      </ul>
    </div>
  )
}

export default App
