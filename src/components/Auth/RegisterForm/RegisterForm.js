import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;

  const onSubmit = () => {
    console.log("formuraio enviado");
  };

  return (
    <div className="register-form">
      <h1>Empieza a difrutar con MusicXL</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            //onChage={}
            //error={}
          />
        </Form.Field>

        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="eye"
            //onChage={}
            //error={}
          />
        </Form.Field>

        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="UserName"
            icon="user circle outline"
            //onChage={}
            //error={}
          />
        </Form.Field>
        <Button type="submit">Registrarse</Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes MusicXL? {""}
          <span onClick={() => setSelectedForm("login")}>Iniciar sesion</span>
        </p>
      </div>
    </div>
  );
}
