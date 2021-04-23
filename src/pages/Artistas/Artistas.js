import React, { useState, useEffect } from "react";
import firebase from "../../utils/Firebase";
import { map } from "lodash";
import {Link} from "react-router-dom"
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
	  <Grid.Column key={artista.id} mobile={8} tablet={4} computer={3}>
            <RenderArtista artista={artista} />
          </Grid.Column>
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
    <Link to={`/artista/${artista.id}`}>
      <div className="artistas__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <h3>{artista.name}</h3>
      </div>
    </Link>
  );
}
