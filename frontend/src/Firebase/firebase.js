import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC5q7i4FhqeaMGJFuJ0Lcy1HK5N0i9ucME',
  authDomain: 'bitsafe-dashboard.firebaseapp.com',
  projectId: 'bitsafe-dashboard',
  storageBucket: 'bitsafe-dashboard.appspot.com',
  messagingSenderId: '197771468817',
  appId: '1:197771468817:web:1dc6dfbfa254cc0450d1b0',
  measurementId: 'G-9QYP3DGN0V',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
}
