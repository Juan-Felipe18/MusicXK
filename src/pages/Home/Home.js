import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import { map } from "lodash";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./Home.scss";

const db = firebase.firestore(firebase);
export default function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((res) => {
        const arrArtists = [];
        map(res?.docs, (artist) => {
          const data = artist.data();
          data.id = artist.id;
          arrArtists.push(data);
        });
        setArtists(arrArtists);
      });
  }, []);

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Ultimos Artistas"
          data={artists}
          folderImg="artists"
        />
      </div>
    </>
  );
}
