import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-QjPybUKXhsnDy9o8dEhrAcwCKUE2pM4",
  authDomain: "quizocity-65f6b.firebaseapp.com",
  projectId: "quizocity-65f6b",
  storageBucket: "quizocity-65f6b.appspot.com",
  messagingSenderId: "904099752923",
  appId: "1:904099752923:web:94f5a43be33be4b5e795fe",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
