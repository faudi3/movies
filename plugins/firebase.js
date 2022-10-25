import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRY-dmVFJtvY9UjvNwdz0KmrDKqaVYkTM",
  authDomain: "movies-184b6.firebaseapp.com",
  projectId: "movies-184b6",
  storageBucket: "movies-184b6.appspot.com",
  messagingSenderId: "873488730549",
  appId: "1:873488730549:web:643e32253ca91e59e031fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//initialize firebase auth
const auth = getAuth(app);

export { auth, db };
