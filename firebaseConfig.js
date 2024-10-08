// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI-sX22p9PBhhs_JbSuTsLbrpcL4Y9wN8",
  authDomain: "ctf-leaderboard-322b2.firebaseapp.com",
  projectId: "ctf-leaderboard-322b2",
  storageBucket: "ctf-leaderboard-322b2.appspot.com",
  messagingSenderId: "329690357542",
  appId: "1:329690357542:web:4d0a1d133bdd33242eebe7",
  measurementId: "G-NJ9T0CXK4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
