// firebaseInit.js
import firebase from "firebase/app";
import "firebase/database";
const dotenv = require("dotenv").config();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "{{API_KEY}}",
  authDomain: "{{AUTH_DOMAIN}}",
  databaseURL: "{{DATABASE_URL}}",
  projectId: "{{PROJECT_ID}}",
  storageBucket: "{{STORAGE_BUCKET}}",
  messagingSenderId: "{{MESSAGING_SENDER_ID}}",
  appId: "{{APP_ID}}",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Export the initialized Firebase app
export default firebase;
