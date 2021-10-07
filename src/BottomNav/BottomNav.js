import { assoc } from 'ramda'
import React from 'react'
import { Link } from 'react-router-dom'
import { action, reduce, when } from 'reactivr'
import { ReactComponent as Logo } from '../SplashScreen/logo.svg'
import styles from './BottomNav.module.css'

/**
 * The name of the bottom nav module
 */
export const name = Symbol('BottomNav')

/**
 * Contains the menu items
 */
export const MENU_ITEM = {
  HOME: 'home',
  NEW_RECIPE: 'plus-square',
  NONE: 'none',
  FAVORITES: 'heart',
  PROFILE: 'user',
}

/**
 * Contains the route attached to each items
 */
export const MENU_ROUTE = {
  HOME: '/',
  NEW_RECIPE: '/nouvelle-recette',
  NONE: '/',
  FAVORITES: '/mes-favories',
  PROFILE: '/mon-profile',
}

/**
 * The state of the bottom nav menu
 */
export const state = {
  activeItem: MENU_ITEM.HOME,
}

/**
 * Allow to change a menu item
 */
export const changeMenuItem = action(
  when('changeMenuItem'),
  reduce(assoc('activeItem')),
)

/**
 * The view of this module
 */
export const View = ({ activeItem }) => {
  return (
    <div className={styles.bottomNav}>
      {Object.entries(MENU_ITEM).map(([menu, ico]) => (
        <Link
          to={MENU_ROUTE[menu]}
          key={`menu-${menu}`}
          className={`${styles.item}${
            activeItem === menu ? ` ${styles.active}` : ''
          }`}
          onClick={e => console.log('todo')}
        >
          {ico === MENU_ITEM.NONE ? (
            <Logo />
          ) : (
            <i className={`fas fa-${ico}`}></i>
          )}
        </Link>
      ))}
    </div>
  )
}
