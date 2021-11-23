import classes from './BottomNav.module.css'
import { ReactComponent as Logo } from './logo.svg'

export default function BottomNav() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.menu}>
        <li className={`${classes.item} ${classes.active}`}>
          <a href='#'>
            <i className='fas fa-home'></i>
          </a>
        </li>
        <li className={classes.item}>
          <a href='#'>
            <i className='fas fa-plus-square'></i>
          </a>
        </li>
        <li className={classes.item}>
          <a href='#' className={classes.logo}>
            <Logo />
          </a>
        </li>
        <li className={classes.item}>
          <a href='#'>
            <i className='fas fa-heart'></i>
          </a>
        </li>
        <li className={classes.item}>
          <a href='#'>
            <i className='fas fa-user'></i>
          </a>
        </li>
      </ul>
    </nav>
  )
}
