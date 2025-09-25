
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
    apiKey: "AIzaSyB3rZvi26UBKQdiRX4CI-AVrPMorxvZMd4",
    authDomain: "apprecetas-8abfe.firebaseapp.com",
    projectId: "apprecetas-8abfe",
    storageBucket: "apprecetas-8abfe.firebasestorage.app",
    messagingSenderId: "292113553693",
    appId: "1:292113553693:web:eba533c9cef9f41134e9f4",
    measurementId: "G-LSFXEVF82N"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export { db };