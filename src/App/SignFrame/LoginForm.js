import React, { useState } from 'react'
import Spinner from '../Component/Spinner'
import styles from './LoginForm.module.css'
import { auth } from '../Util/Firebase'
import {
  useDispatch,
  logInUser,
  changeSignFrameStep,
  SIGN_FRAME_STEP,
} from '../Context/StateContext'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleInputWith = fn => e => fn(e.target.value)

  const authenticate = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await auth.signInWithEmailAndPassword(email, password)

      const user = response.user

      dispatch(
        logInUser({
          uuid: user.uid,
          email: user.email,
          username: user.displayName,
        }),
      )
      dispatch(changeSignFrameStep(SIGN_FRAME_STEP.WELCOME))
    } catch (e) {
      setError('Invalide email ou mot de passe')
      setLoading(false)
    }
  }

  return (
    <>
      <h3 className='text-centered'>Connexion</h3>
      <div className={styles.container}>
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
          className={`form-control ${styles.submitButton} ${
            loading && styles.loadingButton
          }`}
        >
          {loading && <Spinner size='small' />}
          {!loading && (
            <button className='btn' onClick={authenticate}>
              Connexion
            </button>
          )}
        </div>
        <div className='form-control'>
          {!loading && (
            <button className='btn btn-unframed'>Créer un compte</button>
          )}
        </div>
      </div>
    </>
  )
}
