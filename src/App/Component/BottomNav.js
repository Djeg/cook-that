import React from 'react'
import styles from './BottomNav.module.css'
import { ReactComponent as Logo } from '../SplashScreen/logo.svg'
import * as R from 'ramda'

export const MENU = {
  HOME: 'home',
  NEW_RECIPE: 'plus-square',
  NONE: 'none',
  FAVORITES: 'heart',
  PROFILE: 'user',
}

export default ({ active = MENU.HOME }) => {
  let menuItems = R.pipe(
    R.toPairs(),
    R.map(([key, value]) => (
      <div
        key={`menu-${key}`}
        className={`${styles.item}${
          active === value ? ` ${styles.active}` : ''
        }`}
      >
        {value === MENU.NONE ? <Logo /> : <i className={`fas fa-${value}`}></i>}
      </div>
    )),
  )(MENU)

  return <div className={styles.bottomNav}>{menuItems}</div>
}
