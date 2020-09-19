import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setformData] = useState(defaultValurForm);
  const [showPass, setShowPass] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    toast.success("Registro completado");

    setFormError({});
    let error = {};
    let formOk = true;

    //validaciones para el ingreso de datos en el registro
    if (!validateEmail(formData.email)) {
      error.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      error.password = true;
      formOk = false;
    }
    if (!formData.username) {
      error.username = true;
      formOk = false;
    }

    setFormError(error);

    if (formOk) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("Registro completado");
        })
        .catch(() => {
          console.log("error al crear la cuenta");
        })
        .finally(() => {
          setLoading(false);
          setSelectedForm(null);
        });
    }
  };

  const handlerShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="register-form">
      <h1>Empieza a difrutar con MusicXL</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            //onChage={}
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor ingresar correo electronico valido.
            </span>
          )}
        </Form.Field>

        <Form.Field>
          <Input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            error={formError.password}
            icon={
              showPass ? (
                <Icon name="eye slash outline" link onClick={handlerShowPass} />
              ) : (
                <Icon name="eye" link onClick={handlerShowPass} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              Por favor, elige una contraseña superior a 6 caracteres.
            </span>
          )}
        </Form.Field>

        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="UserName"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Por favor introduce un Username.</span>
          )}
        </Form.Field>
        <Button type="submit" loading={loading}>
          Registrarse
        </Button>
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

//formulario definido
function defaultValurForm() {
  return {
    email: "",
    password: "",
    username: "",
  };
}
