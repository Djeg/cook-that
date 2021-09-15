import React, { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'
import { ReactComponent as Logo } from './logo.svg'
import Spinner from '../Component/Spinner'
import { delay } from '../Util/Function'
import { auth } from '../Util/Firebase'
import { useDispatch, logInUser } from '../Context/StateContext'

export default ({ children }) => {
  const [reason, setReason] = useState('')
  const [activated, setActivated] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      setReason('Récéption des produits frais ...')

      // Try to retrieve the persisted user
      auth.onAuthStateChanged(user => {
        if (!user) return

        dispatch(
          logInUser({
            email: user.email,
            uuid: user.uid,
            username: user.displayName,
          }),
        )
      })

      await delay(1500)

      setReason('Préparation de la cuisine ...')

      await delay(1500)

      setReason('Mise en table ...')

      await delay(1500)

      setReason('')
      setActivated(false)
    })()
  }, [])

  if (!activated) return children

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <>
        <Spinner />
        {!!reason && <p className={styles.reason}>{reason}</p>}
      </>
    </div>
  )
}
