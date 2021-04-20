import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import BannerArtist from "../../components/Artist/BannnerArtist";
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
        setArtista(response.data());
      });
  }, [match]);
  return (
    <div className="artista">
      {artista && <BannerArtist artista={artista} />}
      <h2>Mas info</h2>
    </div>
  );
}

export default withRouter(Artista);
