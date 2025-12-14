// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnmhPs0L_WkVWAk368RpjEWTfAxsp5yGk",
  authDomain: "assign-11-56e8b.firebaseapp.com",
  projectId: "assign-11-56e8b",
  storageBucket: "assign-11-56e8b.firebasestorage.app",
  messagingSenderId: "901512056116",
  appId: "1:901512056116:web:fa8138f7ae12f525f26961",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,