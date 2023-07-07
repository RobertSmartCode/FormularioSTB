// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBpogIU_LKsG4dVDI-71APzVJ1A7viiR2g",
  authDomain: "formulario-52152.firebaseapp.com",
  projectId: "formulario-52152",
  storageBucket: "formulario-52152.appspot.com",
  messagingSenderId: "834245201100",
  appId: "1:834245201100:web:c73ba4c95d07ff734c4669",
  measurementId: "G-SEWK1H8V5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);



