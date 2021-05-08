import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAjV9fvlLFOpY9AtE0TpNxdLzyDvnIUGts",
  authDomain: "tenedor-vegano.firebaseapp.com",
  projectId: "tenedor-vegano",
  storageBucket: "tenedor-vegano.appspot.com",
  messagingSenderId: "851142168812",
  appId: "1:851142168812:web:8fbdea56933c30b57555c9",
  measurementId: "G-SN60C2TY37",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
