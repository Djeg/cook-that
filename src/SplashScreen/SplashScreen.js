import { assoc } from 'ramda'
import React from 'react'
import { action, produce, reduce, useLifecycleAction, when } from 'reactivr'
import Spinner from '../Util/Component/Spinner'
import { delay } from '../Util/Function'
import { ReactComponent as Logo } from './logo.svg'
import styles from './SplashScreen.module.css'
import { auth } from '../Util/Firebase'

/**
 * Name of this module
 */
export const name = Symbol('SplashScreen')

/**
 * The initial state of a splash screen
 */
export const state = {
  reason: '',
  loading: true,
  user: null,
}

/**
 * Change the reason
 */
export const changeReason = action(
  when('changeReason'),
  reduce(assoc('reason')),
)

/**
 * Change loading state
 */
export const ready = action(
  when('ready'),
  reduce(() => assoc('loading', false)),
)

/**
 * Set a user
 */
export const setUser = action(when('setUser'), reduce(assoc('user')))

/**
 * Start to load the splash screen job
 */
export const load = action(
  when('load'),
  produce(({ dispatch }) => async () => {
    dispatch(changeReason('Récéption des produits frais ...'))

    auth.onAuthStateChanged(user => {
      if (!user) return

      dispatch(setUser(user))
    })

    await delay(1500)

    dispatch(changeReason('Préparation de la cuisine ...'))

    await delay(1500)

    dispatch(changeReason('Mise en table ...'))

    await delay(1500)

    dispatch(changeReason(''))
    dispatch(ready())
  }),
)

/**
 * Render a SplashScreen
 */
export const View = ({ reason, loading, children }) => {
  useLifecycleAction(load())

  if (!loading) return children

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
