// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9pLhwbs7BARU0hVrGcpd6_IRefgP6AQs",
  authDomain: "amaliyot-d84ef.firebaseapp.com",
  projectId: "amaliyot-d84ef",
  storageBucket: "amaliyot-d84ef.appspot.com",
  messagingSenderId: "599218497574",
  appId: "1:599218497574:web:476a87180458838189dee7",
  measurementId: "G-GRH2Q71CTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export let auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);