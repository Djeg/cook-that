import React from 'react'
import styles from './Spinner.module.css'

export default ({ size = 'normal' }) => (
  <div
    className={`${styles.ldsRing} ${size === 'large' && styles.large} ${
      size === 'small' && styles.small
    }`}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)
