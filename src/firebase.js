import firebase from "firebase";
//Testnet
const firebaseConfig = {
  apiKey: "AIzaSyDZhV6788lbz33t2g_7I5CNaRu0zOczTn8",
  authDomain: "crycto-home.firebaseapp.com",
  projectId: "crycto-home",
  storageBucket: "crycto-home.appspot.com",
  messagingSenderId: "790680130849",
  appId: "1:790680130849:web:7c2ac82d2ccbdb7da7da60",
  measurementId: "G-0TKF5GKVRJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const analytics = firebaseApp.analytics();

export const firestore = firebaseApp.firestore();
