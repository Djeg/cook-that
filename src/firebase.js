// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBG_jP9KLmzicr-TW7AtXx6qJ2qZ4A_UJs',
  authDomain: 'cook-that2.firebaseapp.com',
  projectId: 'cook-that2',
  storageBucket: 'cook-that2.appspot.com',
  messagingSenderId: '374075318888',
  appId: '1:374075318888:web:8f89452081254f159f91dd',
  measurementId: 'G-CL7YC88J6D',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
