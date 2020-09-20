import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPass, setShowPass] = useState(false);

  const handlerShowPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = () => {
    console.log("Login...");
  };

  return (
    <div className="login-form">
      <h1>Musica para todos.</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo"
            icon="mail outline"
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPass ? (
                <Icon name="eye slash outline" link onClick={handlerShowPass} />
              ) : (
                <Icon name="eye" link onClick={handlerShowPass} />
              )
            }
            //error={}
          />
        </Form.Field>
        <Button type="submit">Iniciar Sesion</Button>
      </Form>
      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿No tienes cuenta?{" "}
          <span onClick={() => setSelectedForm("register")}>Registrarme</span>
        </p>
      </div>
    </div>
  );
}
