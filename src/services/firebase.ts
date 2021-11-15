import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKRzvt2qL9Ca9YlozlyoW8rGJz_19QP_A",
  authDomain: "portfolio-87cf8.firebaseapp.com",
  projectId: "portfolio-87cf8",
  storageBucket: "portfolio-87cf8.appspot.com",
  messagingSenderId: "854817638920",
  appId: "1:854817638920:web:fd7e75ef6f1f446ecd9fbd"
};

export const app = ()=> initializeApp(firebaseConfig);


