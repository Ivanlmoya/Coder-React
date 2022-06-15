import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCz3WHPik5prdJQC5s4FrWdRqUU5WwIVi0",
  authDomain: "coretech-fa763.firebaseapp.com",
  projectId: "coretech-fa763",
  storageBucket: "coretech-fa763.appspot.com",
  messagingSenderId: "252137306413",
  appId: "1:252137306413:web:965c60950e3c6d8cd4fba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);