import React, { useEffect, useState } from "react";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./BannerHome.scss";

export default function BannerHome() {
  const [bannerURL, setBannerURL] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref("other/banner.home.png")
      .getDownloadURL()
      .then((url) => {
        setBannerURL(url);
      })
      .catch(() => {});
  }, []);

  if (!bannerURL) {
    return null;
  }

  return (
    <div
      className="banner-home"
      style={{ backgroundImage: `url('${bannerURL}')` }}
    />
  );
}
