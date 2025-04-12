import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDTdAERV_Pw9-qWNjG1jiqNBR3hMW1NI9c",
    authDomain: "samrat-non-veg-foods.firebaseapp.com",
    projectId: "samrat-non-veg-foods",
    storageBucket: "samrat-non-veg-foods.firebasestorage.app",
    messagingSenderId: "559818864794",
    appId: "1:559818864794:web:e88bc8b5e25df218610723",
    databaseURL: "https://samrat-non-veg-foods-default-rtdb.firebaseio.com",
  };

  export const app = initializeApp(firebaseConfig);