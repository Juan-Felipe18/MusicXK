import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import UploadAvatar from "../../components/Settings/UploadAvatar";

import "./Settings.scss";

export default function Settings(props) {
  const { user } = props;

  return (
    <div className="settings">
      <h1>Configuracion</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} />
        <h2>User name</h2>
      </div>
    </div>
  );
}
