// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAkHYas1VLhldj5lNBa5Q0z8XHk_PGMo0",
  authDomain: "chat-app-377c9.firebaseapp.com",
  projectId: "chat-app-377c9",
  storageBucket: "chat-app-377c9.firebasestorage.app",
  messagingSenderId: "468187170689",
  appId: "1:468187170689:web:f4ea3eeb8e8bd15c270a80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}

