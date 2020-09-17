import React from "react";
import firebase from "./utils/Firebase";
import "firebase/auth";

function App() {
  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser ? "Estamos Logeados" : "no estamos logeados");
  });

  return (
    <div className="App">
      <h1>App electron + react</h1>
    </div>
  );
}

export default App;
