// Config file
import firebase from 'firebase/app'
import 'firebase/functions'
import config from "./config"

export default (!firebase.apps.length
  ? firebase.initializeApp(config.firebase)
  : firebase.app())

export const functions = firebase.functions()
if (process.env.NODE_ENV !== 'production') {
  functions.useFunctionsEmulator('http://localhost:5000')
}

export const registerForNewsletter = functions.httpsCallable('registerForNewsletter')