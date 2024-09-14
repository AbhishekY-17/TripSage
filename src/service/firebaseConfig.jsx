// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBQAI3na28ABLeuAg2QFceGrLUS1TBLNE",
  authDomain: "helical-realm-434713-i4.firebaseapp.com",
  projectId: "helical-realm-434713-i4",
  storageBucket: "helical-realm-434713-i4.appspot.com",
  messagingSenderId: "410794982788",
  appId: "1:410794982788:web:78695d36a70e3eb24231d1",
  measurementId: "G-JVK7JKKHH0"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);