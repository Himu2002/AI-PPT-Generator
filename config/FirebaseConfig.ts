import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "react-app-27348.firebaseapp.com",
    projectId: "react-app-27348",
    storageBucket: "react-app-27348.firebasestorage.app",
    messagingSenderId: "894295616428",
    appId: "1:894295616428:web:f9ecbd3ae453b92c992809",
    measurementId: "G-7RZBY62NP1"
};

const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app, '(default)');
