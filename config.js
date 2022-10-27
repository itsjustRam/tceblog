import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxKTCHaZ9f8lKljS0dXLjee05s0mt6ufk",
  authDomain: "test-ad7f2.firebaseapp.com",
  projectId: "test-ad7f2",
  storageBucket: "test-ad7f2.appspot.com",
  messagingSenderId: "899575224095",
  appId: "1:899575224095:web:c725277ac7c2dcf120822a",
  measurementId: "G-FVD57TQQSE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
