import { always, assoc, pipe } from 'ramda'
import React from 'react'
import {
  action,
  eventTargetValue,
  produce,
  reduce,
  useActionEvent,
  when,
} from 'reactivr'
import * as SplashScreen from '../SplashScreen/SplashScreen'
import Spinner from '../Util/Component/Spinner'
import { connectUser } from '../Util/User'
import * as SignFrame from './SignFrame'
import styles from './SignIn.module.css'

/**
 * The module name of the sign in
 */
export const name = Symbol('SignIn')

/**
 * The sign in state
 */
export const state = {
  email: '',
  password: '',
  error: '',
  sending: false,
}

/**
 * Change the email
 */
export const changeEmail = action(when('changeEmail'), reduce(assoc('email')))

/**
 * Change the password
 */
export const changePassword = action(
  when('changePassword'),
  reduce(assoc('password')),
)

/**
 * Change the error
 */
export const changeError = action(
  when('changeError'),
  reduce(err => pipe(assoc('error', err), assoc('sending', false))),
)

/**
 * Send the form
 */
export const send = action(
  when('send'),
  reduce(assoc('sending')),
  produce(({ dispatch, select }) => async () => {
    const { email, password } = select(name)

    console.warn(email, password)

    try {
      const user = await connectUser(email, password)

      dispatch(SplashScreen.setUser(user))
      dispatch(SignFrame.step(SignFrame.STEP.WELCOME))
    } catch (e) {
      dispatch(changeError('Email ou mot de passe invalide'))
    }
  }),
)

/**
 * The SignIn view
 */
export const View = ({ email, password, error, loading }) => {
  const onEmailChange = useActionEvent(eventTargetValue, changeEmail)
  const onPasswordChange = useActionEvent(eventTargetValue, changePassword)
  const onSend = useActionEvent(send)
  const onSignUp = useActionEvent(
    always(SignFrame.STEP.SIGN_UP),
    SignFrame.step,
  )

  return (
    <>
      <h3 className='text-centered'>Connexion</h3>
      <div className={styles.container}>
        <div className='form-control'>
          <label htmlFor='email'>Email :</label>
          <input
            type='email'
            onChange={onEmailChange}
            id='email'
            value={email}
          />
        </div>
        <div className='form-control last-input'>
          <label htmlFor='password'>Mot de passe :</label>
          <input
            type='password'
            onChange={onPasswordChange}
            id='password'
            value={password}
          />
        </div>
        {error && (
          <div className='form-control'>
            <p className='error'>{error}</p>
          </div>
        )}
        <div
          className={`form-control ${styles.submitButton} ${
            loading && styles.loadingButton
          }`}
        >
          {loading && <Spinner size='small' />}
          {!loading && (
            <button className='btn' onClick={onSend}>
              Connexion
            </button>
          )}
        </div>
        <div className='form-control'>
          {!loading && (
            <button className='btn btn-unframed' onClick={onSignUp}>
              Créer un compte
            </button>
          )}
        </div>
      </div>
    </>
  )
}
