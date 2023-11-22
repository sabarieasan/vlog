import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX5UnSnXhrQoK23vStrB9JnUdKx7jXBHs",
  authDomain: "blog-website-f149d.firebaseapp.com",
  projectId: "blog-website-f149d",
  storageBucket: "blog-website-f149d.appspot.com",
  messagingSenderId: "157728150306",
  appId: "1:157728150306:web:820d1a805489a382c20b7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
