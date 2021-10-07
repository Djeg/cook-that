import React from 'react'
import styles from './BottomNav.module.css'
import { ReactComponent as Logo } from '../SplashScreen/logo.svg'
import { Link } from 'react-router-dom'
import {
  MENU,
  useMenu,
  MENU_ROUTE,
  useStateSlice,
  useDispatch,
  openSignFrame,
} from '../Context/StateContext'

export default () => {
  const { active } = useMenu()
  const isConnected = useStateSlice('user.isConnected')
  const dispatch = useDispatch()

  const handleClick = menu => e => {
    if (menu !== MENU.PROFILE || isConnected) {
      return true
    }

    e.preventDefault()
    dispatch(openSignFrame())

    return false
  }

  const menuItems = Object.entries(MENU).map(([key, value]) => (
    <Link
      to={MENU_ROUTE[key]}
      key={`menu-${key}`}
      className={`${styles.item}${active === value ? ` ${styles.active}` : ''}`}
      onClick={handleClick(value)}
    >
      {value === MENU.NONE ? <Logo /> : <i className={`fas fa-${value}`}></i>}
    </Link>
  ))

  return <div className={styles.bottomNav}>{menuItems}</div>
}
