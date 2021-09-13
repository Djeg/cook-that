import React from 'react'
import { Link } from 'react-router-dom'
import styles from './RecipeThumbnail.module.css'

export default ({
  id,
  title,
  duration,
  level,
  score,
  coverImage,
  favorited = false,
}) => (
  <Link to={`/recette/${id}`} className={styles.recipe}>
    <div className={styles.coverImage}>
      <img src={coverImage} />
    </div>
    <p className={styles.title}>{title}</p>
  </Link>
)
