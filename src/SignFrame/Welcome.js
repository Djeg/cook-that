import React from 'react'
import {
  action,
  produce,
  reduce,
  useLifecycleAction,
  useModule,
  when,
} from 'reactivr'
import { assoc } from 'ramda'
import * as SplashScreen from '../SplashScreen/SplashScreen'
import { delay } from '../Util/Function'
import * as SignFrame from './SignFrame'
import styles from './Welcome.module.css'

/**
 * Contains the welcome module name
 */
export const name = Symbol('Welcome')

/**
 * Contains the welcome state
 */
export const state = {
  done: false,
}

/**
 * Change the done state
 */
export const setDone = action(
  when('done'),
  reduce((v = true) => assoc('done', v)),
  produce(({ select, dispatch }) => () => {
    const { done } = select(name)

    if (done) {
      dispatch(SignFrame.toggle())
      dispatch(setDone(false))
    }
  }),
)

/**
 * When the welcome is loaded
 */
export const load = action(
  when('load'),
  produce(({ dispatch }) => async () => {
    await delay(2000)

    dispatch(setDone(true))
  }),
)

/**
 * The component view
 */
export const View = () => {
  const { user } = useModule(SplashScreen)

  useLifecycleAction(load())

  return (
    <>
      <h1 className='text-centered'>Bienvenue {user.email} !</h1>
      <div className={styles.smileContainer}>
        <i className='far fa-smile'></i>
      </div>
    </>
  )
}
