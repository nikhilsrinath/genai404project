import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDYsazUotAZW0lPOp0GDed7oc4QeGIs-Z4",
  authDomain: "soul-app-genai.firebaseapp.com",
  databaseURL: "https://soul-app-genai-default-rtdb.firebaseio.com",
  projectId: "soul-app-genai",
  storageBucket: "soul-app-genai.appspot.com", // ✅ fix here
  messagingSenderId: "1079512174959",
  appId: "1:1079512174959:web:8e025e954777a8f346189a",
  measurementId: "G-P72PTP4HQB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Only init analytics if supported
let analytics;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

export { app, analytics };
