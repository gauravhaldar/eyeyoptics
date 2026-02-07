import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUNMP72JYnhlxWwySZhp_Xysasq_4xviM",
    authDomain: "eyey-bdcba.firebaseapp.com",
    projectId: "eyey-bdcba",
    storageBucket: "eyey-bdcba.firebasestorage.app",
    messagingSenderId: "944503932514",
    appId: "1:944503932514:web:f3d1e4b0b52b55b672b33b",
    measurementId: "G-P1M2WJE349"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
