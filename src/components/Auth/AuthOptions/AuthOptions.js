import React from "react";
import { Button } from "semantic-ui-react";

import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
      <h2>Millones de canciones a tu disposicion GRATIS</h2>
      <Button className="register" onClick={() => setSelectedForm("register")}>
        Registrarse gratis
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Iniciar sesion
      </Button>
    </div>
  );
}
