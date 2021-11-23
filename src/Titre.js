import classes from './Titre.module.css'

export default function Titre({
  name = 'Inconnue',
  age = 12,
  children,
  ...restProps
}) {
  return (
    <h1 className={classes.titre} {...restProps}>
      Bonjour {name}, vous avez {age} ans
      <br />
      {children}
    </h1>
  )
}
