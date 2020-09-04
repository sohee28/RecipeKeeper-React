import * as firebase from "firebase/app";
import "firebase/storage"; //images
import "firebase/firestore"; //database
import "firebase/auth"; //Authentication

var firebaseConfig = {
  apiKey: "AIzaSyCOofWrSdTR1Ej50rBWayCJ_2FMzON7g8U",
  authDomain: "myrecipeapp-480a8.firebaseapp.com",
  databaseURL: "https://myrecipeapp-480a8.firebaseio.com",
  projectId: "myrecipeapp-480a8",
  storageBucket: "myrecipeapp-480a8.appspot.com",
  messagingSenderId: "974854698421",
  appId: "1:974854698421:web:3e1a25d826f00f30a815fc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
export { projectFirestore, projectStorage, auth };
