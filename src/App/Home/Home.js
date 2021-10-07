import React from 'react'
import Container from '../../Util/Component/Container'
import RecipeThumbnail from '../../Util/Component/RecipeThumbnail'
import styles from './Home.module.css'
import { MENU, useActiveMenu } from '../Context/StateContext'
import { useRecipes } from '../Util/Recipes'

export default () => {
  useActiveMenu(MENU.HOME)

  const { recipes } = useRecipes()

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
