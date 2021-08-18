import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDHjvulkMqgqkAfbbLIqrdZf0MtuTWk6TM",
  authDomain: "crycto-v1-beta.firebaseapp.com",
  projectId: "crycto-v1-beta",
  storageBucket: "crycto-v1-beta.appspot.com",
  messagingSenderId: "554148870793",
  appId: "1:554148870793:web:cb75292401f808d2ea6458",
  measurementId: "G-6JNJPKM7QB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();
