import React from 'react'
import styles from './Spinner.module.css'

export default function Spinner({ size = 'normal' }) {
  return (
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
}
