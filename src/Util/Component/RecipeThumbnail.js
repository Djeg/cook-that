import React from 'react'
import { Link } from 'react-router-dom'
import styles from './RecipeThumbnail.module.css'

export default function RecipeThumbnail({
  id,
  title,
  duration,
  level,
  score,
  coverImage,
  favorited = false,
}) {
  return (
    <Link to={`/recette/${id}`} className={styles.recipe}>
      <div className={styles.coverImage}>
        <img src={coverImage} alt={title} />
      </div>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <div className={styles.ico}>
          <i className='far fa-heart'></i>
        </div>
      </div>
      <div className={styles.timing}>
        <p className={styles.timer}>
          {duration.preparation + duration.rest + duration.cooking} min
        </p>
      </div>
      <div className={styles.footer}>
        <p className={styles.difficulty + ' ' + styles[level]}>
          <Level level={level} />
        </p>
        <p className={styles.notes}>
          {Array(score)
            .fill(null)
            .map((v, i) => (
              <i key={`star-${i}-${id}`} className='fas fa-star'></i>
            ))}
        </p>
      </div>
    </Link>
  )
}

const Level = ({ level }) =>
  'easy' === level ? 'Facile' : 'medium' === level ? 'Moyen' : 'Difficile'
