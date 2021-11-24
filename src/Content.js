import classes from './Content.module.css'
import RecipeList from './RecipeList'

export default function Content() {
  return (
    <div className={classes.content}>
      <h1>Nos dernières recettes</h1>
      <RecipeList />
    </div>
  )
}
