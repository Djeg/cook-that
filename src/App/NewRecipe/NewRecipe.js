import React, { useEffect, useState } from 'react'
import Container from '../Component/Container'
import PhotosUploader from '../Component/PhotosUploader'
import Spinner from '../Component/Spinner'
import { Redirect } from 'react-router-dom'
import {
  useFormField,
  useInputChangeOn,
  useErrorChangeOn,
  useValueChangeOn,
} from '../Util/Form'
import DifficultyPicker from './DifficultyPicker'
import IngredientPicker from './IngredientPicker'
import StepPicker from './StepPicker'
import { firestore, storage } from '../Util/Firebase'
import uid from 'short-uuid'
import { useStateSlice, useActiveMenu, MENU } from '../Context/StateContext'

export default function NewRecipe() {
  useActiveMenu(MENU.NEW_RECIPE)

  const {
    value: title,
    error: titleError,
    setField: setTitle,
  } = useFormField('')
  const {
    value: photo,
    error: photoError,
    setField: setPhoto,
  } = useFormField('')
  const {
    value: difficulty,
    error: difficultyError,
    setField: setDifficulty,
  } = useFormField('')
  const {
    value: preparation,
    error: preparationError,
    setField: setPreparation,
  } = useFormField(0)
  const { value: rest, error: restError, setField: setRest } = useFormField(0)
  const {
    value: cooking,
    error: cookingError,
    setField: setCooking,
  } = useFormField(0)
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const user = useStateSlice('user')
  const [recetteId, setRecetteId] = useState(null)

  const saveIngredient = async () => {
    setLoading(true)

    try {
      const ref = `${uid.generate()}-${photo.name}`

      await storage.ref(ref).put(photo)

      const coverImage = await storage.ref(ref).getDownloadURL()

      const doc = await firestore.collection('recipes').add({
        title,
        author: {
          username: user.name || user.email,
          uuid: user.uuid,
        },
        coverImage,
        duration: {
          cooking: Number(cooking),
          rest: Number(rest),
          preparation: Number(preparation),
        },
        level: difficulty,
        online: true,
        score: 0,
        steps,
      })

      for (let ingredient of ingredients) {
        await firestore
          .collection(`recipes/${doc.id}/ingredients`)
          .add(ingredient)
      }

      setLoading(false)
      setRecetteId(doc.id)
    } catch (e) {
      setError('oups ..')
      console.warn(e)
      setLoading(false)
    }
  }

  return (
    <Container>
      {recetteId && <Redirect to={`/recette/${recetteId}`} />}
      <h1>Créer une recette</h1>
      <div className='form-control'>
        <label htmlFor='title'>Nom de la recette :</label>
        {titleError && <p className='error'>{titleError}</p>}
        <input
          value={title}
          onChange={useInputChangeOn(setTitle)}
          type='text'
          id='title'
        />
      </div>
      <div className='form-control'>
        <label htmlFor='photos'>Photos :</label>
        {photoError && <p className='error'>{photoError}</p>}
        <PhotosUploader
          id='photos'
          onError={useErrorChangeOn(setPhoto)}
          onChange={useValueChangeOn(setPhoto)}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='difficulty'>Difficulté :</label>
        <DifficultyPicker
          difficulty={difficulty}
          onChange={useValueChangeOn(setDifficulty)}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='duration-preparation'>
          Temps de préparation (minutes) :
        </label>
        <input
          type='number'
          id='duration-preparation'
          onChange={useInputChangeOn(setPreparation)}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='duration-rest'>Temps de repos (minutes) :</label>
        <input
          type='number'
          id='duration-rest'
          onChange={useInputChangeOn(setRest)}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='duration-cooking'>Temps de cuisson (minutes) :</label>
        <input
          type='number'
          id='duration-cooking'
          onChange={useInputChangeOn(setCooking)}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='ingredients'>Ingrédients</label>
        <IngredientPicker ingredients={ingredients} onChange={setIngredients} />
      </div>
      <div className='form-control'>
        <label htmlFor='steps'>Étapes</label>
        <StepPicker onChange={setSteps} />
      </div>
      <div className='form-control'>
        <label htmlFor='steps'>Sauvegarder et mettre en ligne</label>
        {error && <p className='error'>{error}</p>}
        {loading && <Spinner size='small' />}
        {!loading && (
          <button className='btn btn-green' onClick={saveIngredient}>
            Sauvegarder
          </button>
        )}
      </div>
    </Container>
  )
}
