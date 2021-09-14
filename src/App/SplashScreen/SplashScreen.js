import React, { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'
import { ReactComponent as Logo } from './logo.svg'
import Spinner from '../Util/Spinner'
import { delay } from '../Util/Function'

export default ({ children }) => {
  const [reason, setReason] = useState('')
  const [activated, setActivated] = useState(true)

  useEffect(() => {
    ;(async () => {
      setReason('Récéption des produits frais ...')

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
