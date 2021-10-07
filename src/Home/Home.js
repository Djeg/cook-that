import React from 'react'
import Container from '../Util/Component/Container'
import RecipeThumbnail from '../Util/Component/RecipeThumbnail'
import styles from './Home.module.css'
import Spinner from '../Util/Component/Spinner'
import { useLifecycleAction, action, when, produce, reduce } from 'reactivr'
import { changeMenuItem, MENU_ITEM } from '../BottomNav/BottomNav'
import { fetchLatestRecipes } from '../Util/Recipes'
import { pipe, assoc } from 'ramda'
import { delay } from '../Util/Function'

/**
 * The name of the home module
 */
export const name = Symbol('Home')

/**
 * The state of the home module
 */
export const state = {
  loading: true,
  recipes: [],
}

/**
 * load the recipes
 */
export const load = action(
  when('load'),
  produce(({ dispatch }) => async () => {
    const recipes = await fetchLatestRecipes()

    await delay(500)

    dispatch(receiveRecipes(recipes))
  }),
)

/**
 * Receive the recipes
 */
export const receiveRecipes = action(
  when('receivedRecipes'),
  reduce(recipes => pipe(assoc('recipes', recipes), assoc('loading', false))),
)

/**
 * The home component view
 */
export const View = ({ loading, recipes }) => {
  useLifecycleAction(changeMenuItem(MENU_ITEM.HOME))
  useLifecycleAction(load())

  return (
    <Container>
      <h1>Les dernières recettes</h1>
      <div className={styles.recipeList}>
        {loading && (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        )}
        {!loading &&
          recipes.map(recipe => (
            <RecipeThumbnail key={`recipe-${recipe.id}`} {...recipe} />
          ))}
      </div>
    </Container>
  )
}
