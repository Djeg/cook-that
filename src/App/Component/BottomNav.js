import React from 'react'
import styles from './BottomNav.module.css'
import { ReactComponent as Logo } from '../SplashScreen/logo.svg'
import { Link } from 'react-router-dom'
import { MENU, useMenu, MENU_ROUTE } from '../Context/StateContext'

export default () => {
  const { active } = useMenu()

  let menuItems = Object.entries(MENU).map(([key, value]) => (
    <Link
      to={MENU_ROUTE[key]}
      key={`menu-${key}`}
      className={`${styles.item}${active === value ? ` ${styles.active}` : ''}`}
    >
      {value === MENU.NONE ? <Logo /> : <i className={`fas fa-${value}`}></i>}
    </Link>
  ))

  return <div className={styles.bottomNav}>{menuItems}</div>
}
