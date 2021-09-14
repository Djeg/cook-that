import React, { useEffect } from 'react'
import {
  useStateSlice,
  useDispatch,
  closeSignFrame,
} from '../Context/StateContext'
import { delay } from '../Util/Function'
import styles from './Welcome.module.css'

export default function Welcome() {
  const username = useStateSlice('user.username')
  const email = useStateSlice('user.email')
  const formattedMail = email.replace(/@(.*)/, '').replaceAll('.', ' ')
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      await delay(2000)

      dispatch(closeSignFrame())
    })()
  }, [])

  return (
    <>
      <h1 className='text-centered'>Bienvenue {username || formattedMail} !</h1>
      <div className={styles.smileContainer}>
        <i className='far fa-smile'></i>
      </div>
    </>
  )
}
