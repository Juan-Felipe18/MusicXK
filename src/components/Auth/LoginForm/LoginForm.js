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
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPass = () => {
    setShowPass(!showPass);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log(formData);
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          setUser(res.user);
          setUserActive(res.user.emailVerified);
          if (!res.user.emailVerified) {
            toast.warning(
              "Para poder hacer login antes debes verificar la cuenta"
            );
          }
        })
        .catch((err) => {
          handlerErrors(err.code);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="login-form">
      <h1>Musica para todos.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, ingrese un correo valido.
            </span>
          )}
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
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              Por favor, ingrese la contraseña correcta.
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={loading}>
          Iniciar Sesion
        </Button>
      </Form>
      {!userActive && (
        <ButtonResendVerification
          user={user}
          setLoading={setLoading}
          setUserActive={setUserActive}
        />
      )}

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

function ButtonResendVerification(props) {
  const { user, setLoading, setUserActive } = props;
  const resendVerification = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el email de verificacion.");
      })
      .catch((err) => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        Si no has recivido el email de verificaion, puedes volver a enviarlo
        haciendo click <span onClick={resendVerification}>aqui.</span>
      </p>
    </div>
  );
}

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrectos");
      break;

    case "auth/too-many-requests":
      toast.warning(
        "Has enviado demasiadas solicitudes de renvio de verificacion en muy poco tiempo"
      );
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrectos");
      break;

    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}
