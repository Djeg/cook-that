import classes from './AddRecipe.module.css'
import { useState, useEffect } from 'react'

export default function AddRecipe() {
  const [name, setName] = useState('')

  // useEffect avec un [] : La fonction de n'éxécutera
  // que lors de l'affichage du composant

  return (
    <form>
      <div>
        <label for='name'>Nom de la recette :</label>
        <input
          type='text'
          id='name'
          onChange={event => {
            setName(event.target.value)
          }}
        />
      </div>
      <div>
        <button
          type='submit'
          onClick={event => {
            event.preventDefault()
            console.log('Le nom est : ' + name)
          }}
        >
          Sauvegarder
        </button>
      </div>
    </form>
  )
}
