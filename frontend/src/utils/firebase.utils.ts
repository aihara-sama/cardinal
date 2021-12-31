import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import 'firebase/firestore'
// import 'firebase/auth'

export const firebaseConfig = {
  apiKey: 'AIzaSyAXPEr9OUMVttCdhrPJRFRiAUY6CV1fDuo',
  authDomain: 'sentences-3406a.firebaseapp.com',
  databaseURL: 'https://sentences-3406a-default-rtdb.firebaseio.com',
  projectId: 'sentences-3406a',
  storageBucket: 'sentences-3406a.appspot.com',
  messagingSenderId: '394776494553',
  appId: '1:394776494553:web:53ff73313d7c8b4eebd9c8',
  measurementId: 'G-CB1WWFHH95',
};

firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();

// Google provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export default firebase;
