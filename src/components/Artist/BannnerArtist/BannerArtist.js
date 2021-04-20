import React, { useState, useEffect } from "react";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import "./BannerArtist.scss";

function BannerArtist(props) {
  const { artista } = props;
  const [bannerUrl, setBannerUrl] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${artista?.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [artista]);

  return (
    <div
      className="banner-artist"
      style={{ background: `url('${bannerUrl}')` }}
    >
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h4>ARTISTA</h4>
        <h1>{artista.name}</h1>
      </div>
    </div>
  );
}

export default BannerArtist;
