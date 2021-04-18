import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "./Artista.scss";

const db = firebase.firestore(firebase);

function Artista(props) {
  const { match } = props;
  const [artista, setArtista] = useState(null);

  useEffect(() => {
    db.collection("artists")
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        console.log(response);
      });
  }, []);
  console.log(props);
  return (
    <div>
      <h1>Artista tales</h1>
    </div>
  );
}

export default withRouter(Artista);
