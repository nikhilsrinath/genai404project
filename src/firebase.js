// firebase.js
import { initializeApp } from "firebase/app";
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
