import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // Ajoutez ceci pour utiliser Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyBKiCQ0_-PPn2mMTbsxEgU2-ujbvI_Ne3o",
    authDomain: "hietsena.firebaseapp.com",
    databaseURL: "https://hietsena-default-rtdb.firebaseio.com",
    projectId: "hietsena",
    storageBucket: "hietsena.appspot.com",
    messagingSenderId: "695609186595",
    appId: "1:695609186595:web:fdff339a09f69e8de71496",
    measurementId: "G-P0R1TP54BH"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage(); // Initialisez Firebase Storage

export { firebase, storage }; // Exportez Firebase et Firebase Storage
