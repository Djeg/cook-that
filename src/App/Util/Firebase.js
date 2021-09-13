import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDpoX9GrV6RzQTVrLRoSksoDJVIQumUoT4',
  authDomain: 'cookthat-8cd9b.firebaseapp.com',
  projectId: 'cookthat-8cd9b',
  storageBucket: 'cookthat-8cd9b.appspot.com',
  messagingSenderId: '263852106888',
  appId: '1:263852106888:web:7f556f3cea2895cf3e6b3d',
}

export const app = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const firestore = firebase.firestore()
