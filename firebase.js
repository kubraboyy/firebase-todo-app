import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOX9djF_7_nQeiZuxQZldRYTQlElTcFZs",
  authDomain: "todo-app-5986d.firebaseapp.com",
  projectId: "todo-app-5986d",
  storageBucket: "todo-app-5986d.appspot.com",
  messagingSenderId: "981755161748",
  appId: "1:981755161748:web:fcbce861d17749f3aed881",
  measurementId: "G-Y68V1RRF33"}

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };