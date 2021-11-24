import classes from './Content.module.css'
import RecipeList from './RecipeList'

export default function Content({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
