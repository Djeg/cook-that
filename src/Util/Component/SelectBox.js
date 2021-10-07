import React from 'react'
import styles from './SelectBox.module.css'

export default function SelectBox({ children, ...restProps }) {
  return (
    <div className={styles.selectBox}>
      <select {...restProps}>{children}</select>
    </div>
  )
}
