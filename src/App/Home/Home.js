import React, { useEffect, useState } from 'react'
import Container from '../Component/Container'
import { firestore } from '../Util/Firebase'
import RecipeThumbnail from './RecipeThumbnail'
import styles from './Home.module.css'

export default () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    ;(async () => {
      const query = await firestore.collection('recipes').get()

      const recipes = query.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setRecipes(recipes)
    })()
  }, [])

  return (
    <Container>
      <h1>Les dernières recettes</h1>
      <div className={styles.recipeList}>
        {recipes.map(recipe => (
          <RecipeThumbnail key={`recipe-${recipe.id}`} {...recipe} />
        ))}
      </div>
    </Container>
  )
}
