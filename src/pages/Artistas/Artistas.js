import React, { useState, useEffect } from "react";
import firebase from "../../utils/Firebase";
import { map } from "lodash";
import "firebase/firestore";
import "./Artistas.scss";
import { Grid } from "semantic-ui-react";

const db = firebase.firestore(firebase);

export default function Artistas() {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtistas = [];
        map(response?.docs, (artista) => {
          const data = artista.data();
          data.id = artista.id;
          arrayArtistas.push(data);
        });
        setArtistas(arrayArtistas);
      });
  }, []);
  return (
    <div className="artistas">
      <h1>Artistas</h1>
      <Grid>
        {map(artistas, (artista) => (
          <RenderArtista key={artista.id} artista={artista} />
        ))}
      </Grid>
    </div>
  );
}

function RenderArtista(props) {
  const { artista } = props;
  const [bannerUrl, setBannerUrl] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${artista.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [artista]);

  return (
    <div>
      <h2>Artista</h2>
    </div>
  );
}
