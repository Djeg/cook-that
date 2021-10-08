import { always, assoc, pipe } from 'ramda'
import React from 'react'
import {
  action,
  eventTargetValue,
  reduce,
  useActionEvent,
  when,
  produce,
} from 'reactivr'
import Spinner from '../Util/Component/Spinner'
import * as SignFrame from './SignFrame'
import * as SplashScreen from '../SplashScreen/SplashScreen'
import signInStyles from './SignIn.module.css'
import { createUser } from '../Util/User'

/**
 * The name of the signup module
 */
export const name = Symbol('SignUp')

/**
 * The state fof the sign up module
 */
export const state = {
  email: '',
  password: '',
  error: '',
  sending: false,
}

/**
 * change email action
 */
export const changeEmail = action(when('changeEmail'), reduce(assoc('email')))

/**
 * Change pasword action
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
 * Send the registration form
 */
export const send = action(
  when('send'),
  reduce(() => pipe(assoc('error', ''), assoc('sending', true))),
  produce(({ dispatch, select }) => async () => {
    const { email, password } = select(name)

    try {
      const user = await createUser(email, password)

      dispatch(SplashScreen.setUser(user))
      dispatch(SignFrame.step(SignFrame.STEP.WELCOME))
    } catch (e) {
      dispatch(changeError(e.message))
    }
  }),
)

/**
 * The SignUp View
 */
export const View = ({ email, password, error, sending }) => {
  const onEmailChange = useActionEvent(eventTargetValue, changeEmail)
  const onPasswordChange = useActionEvent(eventTargetValue, changePassword)
  const onSend = useActionEvent(send)
  const onSignIn = useActionEvent(
    always(SignFrame.STEP.SIGN_IN),
    SignFrame.step,
  )

  return (
    <>
      <h3 className='text-centered'>Créer un compte</h3>
      <div className={signInStyles.container}>
        <div className='form-control'>
          <label htmlFor='email'>Email :</label>
          <input
            type='email'
            value={email}
            onChange={onEmailChange}
            id='email'
          />
        </div>
        <div className='form-control last-input'>
          <label htmlFor='password'>Mot de passe :</label>
          <input
            type='password'
            value={password}
            onChange={onPasswordChange}
            id='password'
          />
        </div>
        {error && (
          <div className='form-control'>
            <p className='error'>{error}</p>
          </div>
        )}
        <div
          className={`form-control ${signInStyles.submitButton} ${
            sending && signInStyles.loadingButton
          }`}
        >
          {sending && <Spinner size='small' />}
          {!sending && (
            <button className='btn' onClick={onSend}>
              S'inscrire
            </button>
          )}
        </div>
        <div className='form-control'>
          {!sending && (
            <button className='btn btn-unframed' onClick={onSignIn}>
              Se connécter
            </button>
          )}
        </div>
      </div>
    </>
  )
}
