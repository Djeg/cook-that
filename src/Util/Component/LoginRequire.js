import React from 'react'
import Container from './Container'
import {
  useDispatch,
  changeSignFrameStep,
  SIGN_FRAME_STEP,
  openSignFrame,
} from '../Context/StateContext'
import styles from './LoginRequire.module.css'

export default function LoginRequire() {
  const dispatch = useDispatch()

  const openLogin = () => {
    dispatch(changeSignFrameStep(SIGN_FRAME_STEP.LOGIN))
    dispatch(openSignFrame())
  }

  const openRegistration = () => {
    dispatch(changeSignFrameStep(SIGN_FRAME_STEP.SUBSCRIBE))
    dispatch(openSignFrame())
  }

  return (
    <Container>
      <h1 className='text-centered'>Oups ...</h1>
      <div className={styles.smiley}>
        <i class='far fa-sad-tear'></i>
      </div>
      <p className={styles.big}>
        Vous devez être connécté afin d'accéder à ce service.
      </p>
      <div className='form-control'>
        <button className='btn' onClick={openLogin}>
          Connéctez vous
        </button>
      </div>
      <div className='form-control'>
        <button className='btn btn-unframed' onClick={openRegistration}>
          Créer votre compte
        </button>
      </div>
    </Container>
  )
}
