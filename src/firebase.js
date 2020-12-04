import firebase from "firebase";
// Add the Firebase products that you want to use
//import "firebase/auth";
//import "firebase/firestore";
//import 'firebase/database';
//import 'firebase/storage';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBNxzwOvyKD2g7ab1RIPX_duCcdfeZn-jY",
    authDomain: "react-crud-2798b.firebaseapp.com",
    databaseURL: "https://react-crud-2798b-default-rtdb.firebaseio.com",
    projectId: "react-crud-2798b",
    storageBucket: "react-crud-2798b.appspot.com",
    messagingSenderId: "976442765870",
    appId: "1:976442765870:web:112ea2af05a791fe8ea5bf"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();