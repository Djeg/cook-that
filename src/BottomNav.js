import classes from './BottomNav.module.css'
import { ReactComponent as Logo } from './logo.svg'
import { Link } from 'react-router-dom'

export default function BottomNav({ active = 'home' }) {
  return (
    <nav className={classes.nav}>
      <ul className={classes.menu}>
        <li
          className={`${classes.item} ${
            active === 'home' ? classes.active : null
          }`}
        >
          <Link to='/'>
            <i className='fas fa-home'></i>
          </Link>
        </li>
        <li
          className={`${classes.item} ${
            active === 'plus' ? classes.active : null
          }`}
        >
          <Link to='/ajouter-une-recette'>
            <i className='fas fa-plus-square'></i>
          </Link>
        </li>
        <li className={classes.item}>
          <a href='#' className={classes.logo}>
            <Logo />
          </a>
        </li>
        <li
          className={`${classes.item} ${
            active === 'heart' ? classes.active : null
          }`}
        >
          <a href='#'>
            <i className='fas fa-heart'></i>
          </a>
        </li>
        <li
          className={`${classes.item} ${
            active === 'user' ? classes.active : null
          }`}
        >
          <a href='#'>
            <i className='fas fa-user'></i>
          </a>
        </li>
      </ul>
    </nav>
  )
}
