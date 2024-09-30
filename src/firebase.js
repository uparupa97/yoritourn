// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGfAWA8GbtJntyMmJQH7eN3EKMbKghUIo",
  authDomain: "blacknwhiteyori.firebaseapp.com",
  projectId: "blacknwhiteyori",
  storageBucket: "blacknwhiteyori.appspot.com",
  messagingSenderId: "151694362767",
  appId: "1:151694362767:web:6275166c0d4f7c707448fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 