import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import LoggedLayout from "./layouts/LoggedLayout/LoggedLayout";

function App() {
  //Estado de Usuarios
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

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
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      )}
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

export default App;
