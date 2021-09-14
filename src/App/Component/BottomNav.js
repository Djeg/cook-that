import React from 'react'
import styles from './BottomNav.module.css'
import { ReactComponent as Logo } from '../SplashScreen/logo.svg'
import * as R from 'ramda'
import { Link } from 'react-router-dom'

export const MENU = {
  HOME: 'home',
  NEW_RECIPE: 'plus-square',
  NONE: 'none',
  FAVORITES: 'heart',
  PROFILE: 'user',
}

export const ROUTE = {
  HOME: '/',
  NEW_RECIPE: '/nouvelle-recette',
  NONE: '/',
  FAVORITES: '/mes-favories',
  PROFILE: '/mon-profile',
}

export default ({ active = MENU.FAVORITES }) => {
  let menuItems = R.pipe(
    R.toPairs(),
    R.map(([key, value]) => (
      <Link
        to={ROUTE[key]}
        key={`menu-${key}`}
        className={`${styles.item}${
          active === value ? ` ${styles.active}` : ''
        }`}
      >
        {value === MENU.NONE ? <Logo /> : <i className={`fas fa-${value}`}></i>}
      </Link>
    )),
  )(MENU)

  return <div className={styles.bottomNav}>{menuItems}</div>
}
