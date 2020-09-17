import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBYIPx5Dp0KzBlFOmALeyl_KepJWXzgYxg",
  authDomain: "musicxl.firebaseapp.com",
  databaseURL: "https://musicxl.firebaseio.com",
  projectId: "musicxl",
  storageBucket: "musicxl.appspot.com",
  messagingSenderId: "1017433230969",
  appId: "1:1017433230969:web:60642e3024ad5c6436cea8",
};

export default firebase.initializeApp(firebaseConfig);
