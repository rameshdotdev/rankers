// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rankers-c422a.firebaseapp.com",
  projectId: "rankers-c422a",
  storageBucket: "rankers-c422a.firebasestorage.app",
  messagingSenderId: "140528683370",
  appId: "1:140528683370:web:c72ad34712e14f58c0fd13",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
