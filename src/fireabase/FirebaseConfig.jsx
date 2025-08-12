// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACK5Nmh_3_P5MbiCg43up3smDD88uOc14",
  authDomain: "ecommerce-fd2d3.firebaseapp.com",
  projectId: "ecommerce-fd2d3",
  storageBucket: "ecommerce-fd2d3.appspot.com",
  messagingSenderId: "756580744493",
  appId: "1:756580744493:web:049098f69fc2c6fe1567a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;