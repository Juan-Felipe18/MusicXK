import React, { useEffect } from "react";
import { map } from "lodash";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

import "./BasicSliderItems.scss";
import { useState } from "react";

export default function BasicSliderItems(props) {
  const { title, data, folderImg, urlName } = props;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    className: "basic-slider-items__list",
  };

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (item) => (
          <RenderItem
            key={item.id}
            item={item}
            folderImg={folderImg}
            urlName={urlName}
          />
        ))}
      </Slider>
    </div>
  );
}

function RenderItem(props) {
  const { item, folderImg, urlName } = props;

  const [img, setImg] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImg}/${item.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImg(url);
      });
  }, [item, folderImg]);

  return (
    <Link to={`/${urlName}/${item.id}`}>
      <div className="basic-slider-items__list-item">
        <div className="avatar" style={{ backgroundImage: `url('${img}')` }} />
        <h3>{item.name}</h3>
      </div>
    </Link>
  );
}
