// firebase.js
import { initializeApp } from "firebase/app";
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
