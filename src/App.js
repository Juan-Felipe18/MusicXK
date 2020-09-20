import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";

function App() {
  //Estado de Usuarios
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUser) => {
    // console.log(currentUser);
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  });

  if (loading) {
    return null;
  }

  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

function UserLogged() {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Usuario logeado</h1>
      <button onClick={logout}>cerrar sesion</button>
    </div>
  );
}

export default App;
