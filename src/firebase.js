// firebase.js
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB20-Q6mtYJ7PIm6eF0avjrgXAnYSrykDs",
  authDomain: "qbitio-recruit.firebaseapp.com",
  databaseURL: "https://qbitio-recruit-default-rtdb.firebaseio.com",
  projectId: "qbitio-recruit",
  storageBucket: "qbitio-recruit.firebasestorage.app",
  messagingSenderId: "656958168526",
  appId: "1:656958168526:web:3967ea79fecc81ab15df9f",
  measurementId: "G-V89CV6WYQ1"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
=======
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYsazUotAZW0lPOp0GDed7oc4QeGIs-Z4",
  authDomain: "soul-app-genai.firebaseapp.com",
  databaseURL: "https://soul-app-genai-default-rtdb.firebaseio.com",
  projectId: "soul-app-genai",
  storageBucket: "soul-app-genai.appspot.com", 
  messagingSenderId: "1079512174959",
  appId: "1:1079512174959:web:8e025e954777a8f346189a",
  measurementId: "G-P72PTP4HQB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Google Authentication provider
const provider = new GoogleAuthProvider();

export { app, auth, provider, signInWithPopup };
>>>>>>> sugan
