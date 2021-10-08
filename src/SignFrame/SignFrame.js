import { assoc, evolve, not } from 'ramda'
import React from 'react'
import { action, reduce, Render, useActionEvent, when } from 'reactivr'
import * as SignUp from './SignUp'
import * as SignIn from './SignIn'
import * as Welcome from './Welcome'
import styles from './SignFrame.module.css'

/**
 * This is the SignFrame module name
 */
export const name = Symbol('SignFrame')

/**
 * Contains the sign frame step
 */
export const STEP = {
  SIGN_UP: 'signUp',
  SIGN_IN: 'signIn',
  WELCOME: 'welcome',
}

/**
 * This is the sign frame state
 */
export const state = {
  open: false,
  step: STEP.SIGN_IN,
}

/**
 * Toggle the sign frame
 */
export const toggle = action(
  when('toggle'),
  reduce(() =>
    evolve({
      open: not,
    }),
  ),
)

/**
 * Change the sign frame step
 */
export const step = action(when('step'), reduce(assoc('step')))

/**
 * The sign frame view
 */
export const View = ({ open, step }) => {
  const toggleFrame = useActionEvent(toggle)
  const stopPropagation = ev => ev.stopPropagation()

  if (!open) return null

  return (
    <div className={styles.frame} onClick={toggleFrame}>
      <div className={styles.container} onClick={stopPropagation}>
        {step !== STEP.WELCOME && (
          <div className={styles.closeButton} onClick={toggleFrame}>
            <i className='fas fa-times'></i>
          </div>
        )}
        <FrameContent step={step} />
      </div>
    </div>
  )
}

const FrameContent = ({ step }) => {
  switch (step) {
    case STEP.SIGN_IN:
      return <Render state={SignIn} />
    case STEP.SIGN_UP:
      return <Render state={SignUp} />
    default:
      return <Render state={Welcome} />
  }
}
