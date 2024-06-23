import firebase from "firebase/compat/app";
import { getAuth } from "firebase/compat/auth";
import { getFirestore } from "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnKl8XN8C2xcqWLfRpMvsMObOTSl6K1PY",
  authDomain: "clone-13fe4.firebaseapp.com",
  projectId: "clone-13fe4",
  storageBucket: "clone-13fe4.appspot.com",
  messagingSenderId: "369404385503",
  appId: "1:369404385503:web:5d6ce4ddc570514f5df16a"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
