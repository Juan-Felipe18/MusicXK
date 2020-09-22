import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import UserImg from "../../assets/png/user.png";

import "./TopBar.scss";

export default function TopBar(props) {
  const { user } = props;

  const logout = () => {
    console.log("cerrar sesion");
  };

  const goBack = () => {
    console.log("atras");
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={UserImg} />
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={logout} />
      </div>
    </div>
  );
}
