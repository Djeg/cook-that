import classes from './RecipeThumb.module.css'

export default function RecipeThumb({
  title,
  liked,
  duration,
  level,
  stars,
  image,
}) {
  return (
    <div className={classes.recipeThumb}>
      <div className={classes.backgroundImage}>
        <img src={image} alt={title} />
      </div>
      <div className={classes.firstLine}>
        <p className={classes.title}>{title}</p>
        <p className={classes.like}>
          {liked ? (
            <i className='fas fa-heart'></i>
          ) : (
            <i className='far fa-heart'></i>
          )}
        </p>
      </div>
      <div className={classes.secondLine}>
        <p className={classes.duration}>{duration}</p>
      </div>
      <div className={classes.thirdLine}>
        <p
          className={
            classes.level +
            ' ' +
            (level === 'Facile'
              ? classes.easy
              : level === 'Moyen'
              ? classes.medium
              : classes.hard)
          }
        >
          {level}
        </p>
        <p className={classes.stars}>
          {Array(stars)
            .fill(null)
            .map((value, index) => (
              <i key={`star-${index}`} className='fas fa-star'></i>
            ))}
        </p>
      </div>
    </div>
  )
}
