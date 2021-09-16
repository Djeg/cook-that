import React from 'react'
import {
  SIGN_FRAME_STEP,
  useStateSlice,
  closeSignFrame,
  useDispatch,
} from '../Context/StateContext'
import styles from './SignFrame.module.css'
import LoginForm from './LoginForm'
import Welcome from './Welcome'
import Registration from './Registration'

export default ({ children }) => {
  const open = useStateSlice('signFrame.open')
  const step = useStateSlice('signFrame.step')
  const dispatch = useDispatch()

  if (!open) return null

  const stopPropagation = ev => ev.stopPropagation()

  return (
    <div className={styles.frame} onClick={e => dispatch(closeSignFrame())}>
      <div className={styles.container} onClick={stopPropagation}>
        {step !== SIGN_FRAME_STEP.WELCOME && (
          <div
            className={styles.closeButton}
            onClick={e => dispatch(closeSignFrame())}
          >
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
    case SIGN_FRAME_STEP.LOGIN:
      return <LoginForm />
    case SIGN_FRAME_STEP.SUBSCRIBE:
      return <Registration />
    default:
      return <Welcome />
  }
}
