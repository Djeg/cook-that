import React from 'react'
import styles from './SplashScreen.module.css'
import { ReactComponent as Logo } from './logo.svg'
import { useSelector } from 'react-redux'
import { selectSplashScreen } from './SplashScreenState'
import Spinner from '../Util/Spinner'

export default ({ children }) => {
  const { activated, reason, loading } = useSelector(selectSplashScreen)

  if (!activated) return children

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      {loading ? (
        <>
          <Spinner />
          {!!reason && <p className={styles.reason}>{reason}</p>}
        </>
      ) : null}
    </div>
  )
}
