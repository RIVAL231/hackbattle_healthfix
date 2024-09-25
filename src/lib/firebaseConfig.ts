// src/lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDW-pakenlGaujGaqygYrQvfBgpZzXUDfM",
    authDomain: "digiswasth-56bcb.firebaseapp.com",
    projectId: "digiswasth-56bcb",
    storageBucket: "digiswasth-56bcb.appspot.com",
    messagingSenderId: "1070513196841",
    appId: "1:1070513196841:web:0b31cf0b5628f9b6d9b138",
    measurementId: "G-C7472G8N01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
