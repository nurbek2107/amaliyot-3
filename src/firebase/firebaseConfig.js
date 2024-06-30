import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEHwnxz99EzQKgQJ810HxYpXPrBwAScF4",
  authDomain: "mymarket-e0861.firebaseapp.com",
  projectId: "mymarket-e0861",
  storageBucket: "mymarket-e0861.appspot.com",
  messagingSenderId: "357483405494",
  appId: "1:357483405494:web:31f278e229e72d1042c617",
  measurementId: "G-H0PEBKQ1QS"
};

const app = initializeApp(firebaseConfig);

// auth 
export const auth = getAuth(app)