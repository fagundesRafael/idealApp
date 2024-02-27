import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsC4EQHB7ao0B98FHKWn76a8_VetcaJ_8",
  authDomain: "idealapp-da571.firebaseapp.com",
  projectId: "idealapp-da571",
  storageBucket: "idealapp-da571.appspot.com",
  messagingSenderId: "579274400407",
  appId: "1:579274400407:web:865cc7d97fee4afebabfd2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app)

const storage = getStorage(app);

export { app, auth, db, storage };