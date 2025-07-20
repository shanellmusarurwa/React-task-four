// config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwbff19TWIO036-5BSwKCBE-7sVpB-Ly8",
  authDomain: "dashboard-task-c5e38.firebaseapp.com",
  projectId: "dashboard-task-c5e38",
  storageBucket: "dashboard-task-c5e38.appspot.com",
  messagingSenderId: "705588466174",
  appId: "1:705588466174:web:a8ca1b9ca2212dbf9a70af",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  db
};
