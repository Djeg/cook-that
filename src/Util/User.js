import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from '@firebase/auth'
import { auth } from './Firebase'

/**
 * Retrieve user from the browser session
 */
export const getUserFromSession = () => {
  return new Promise(res => {
    auth.onAuthStateChanged(res)
  })
}

/**
 * Create a user with email and password
 */
export const createUser = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence)

  return createUserWithEmailAndPassword(auth, email, password)
}

/**
 * Connect a user
 */
export const connectUser = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence)

  return signInWithEmailAndPassword(auth, email, password)
}
