// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, connectAuthEmulator  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTtex7pk5ygXn8PUygLXyptERUl9AelE0",
  authDomain: "mytube-78ca0.firebaseapp.com",
  projectId: "mytube-78ca0",
  storageBucket: "mytube-78ca0.appspot.com",
  messagingSenderId: "1057904530049",
  appId: "1:1057904530049:web:7c97ce5c0be21d2ab57380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:5173");
export const provider = new GoogleAuthProvider();

export default app