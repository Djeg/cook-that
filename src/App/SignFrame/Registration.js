import React, { useState } from 'react'
import Spinner from '../Component/Spinner'
import loginStyles from './LoginForm.module.css'
import {
  useDispatch,
  logInUser,
  changeSignFrameStep,
  SIGN_FRAME_STEP,
} from '../Context/StateContext'
import { auth } from '../Util/Firebase'

export default function Registration() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleInputWith = fn => e => fn(e.target.value)

  const createAccount = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )

      const user = response.user

      dispatch(
        logInUser({
          email: user.email,
          uuid: user.uid,
          username: user.displayName,
        }),
      )
      dispatch(changeSignFrameStep(SIGN_FRAME_STEP.WELCOME))
      setLoading(false)
    } catch (e) {
      setLoading(false)

      if (/weak-password/.test(e.code)) {
        return setError('Votre mot de doit contenir au moins 6 caractères.')
      }

      if (/email-already-in-use/.test(e.code)) {
        return setError('Un utilisateur avec cet email existe dèja')
      }

      setError('Une erreur est survenue veuillez réessayer plus tard')
    }
  }

  return (
    <>
      <h3 className='text-centered'>Créer un compte</h3>
      <div className={loginStyles.container}>
        <div className='form-control'>
          <label htmlFor='email'>Email :</label>
          <input type='email' onChange={handleInputWith(setEmail)} id='email' />
        </div>
        <div className='form-control last-input'>
          <label htmlFor='password'>Mot de passe :</label>
          <input
            type='password'
            onChange={handleInputWith(setPassword)}
            id='password'
          />
        </div>
        {error && (
          <div className='form-control'>
            <p className='error'>{error}</p>
          </div>
        )}
        <div
          className={`form-control ${loginStyles.submitButton} ${
            loading && loginStyles.loadingButton
          }`}
        >
          {loading && <Spinner size='small' />}
          {!loading && (
            <button className='btn' onClick={createAccount}>
              S'inscrire
            </button>
          )}
        </div>
      </div>
    </>
  )
}
