const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCnsExeY_rYb9v8Fg3O6vPFh9EGtsF7lWg",
  authDomain: "wietech-14252.firebaseapp.com",
  databaseURL:
    "https://wietech-14252-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wietech-14252",
  storageBucket: "wietech-14252.appspot.com",
  messagingSenderId: "178905299547",
  appId: "1:178905299547:web:66dcba3aff73cbdcc0dd7e",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbrt = firebase.database();
module.exports = dbrt;
