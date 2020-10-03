import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { reAuth } from "../../utils/Api";
import alertError from "../../utils/AlertError";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserPassword(props) {
  const { setShowModal, setTitleModal, setContentModal } = props;
  const onEdit = () => {
    setTitleModal("Cambiar contraseña");
    setContentModal(<ChangePassword setShowModal={setShowModal} />);
    setShowModal(true);
  };
  return (
    <div className="user-password">
      <h3>Contraseña: *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangePassword(props) {
  const { setShowModal } = props;
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const handlerPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning("Las costraseñas no pueden estar vacias.");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("Las contraseña no puede ser igual");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("Las nuevas costraseñas no son iguales");
    } else if (formData.newPassword.length < 6) {
      toast.warning("La contraseña tienes que ser mayor a 6 caracteres");
    } else {
      setLoading(true);
      reAuth(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              toast.success("Se actializo la contraseña.");
              setLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch((err) => {
              alertError(err?.code);
              setLoading(false);
            });
        })
        .catch((err) => {
          alertError(err?.code);
          setLoading(false);
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Contraseña Acutual"
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPass ? "eye slash outline" : "eye"}
              link
              onClick={handlerPass}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Nueva Contraseña"
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPass ? "eye slash outline" : "eye"}
              link
              onClick={handlerPass}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Confirmar Nueva Contraseña"
          onChange={(e) =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPass ? "eye slash outline" : "eye"}
              link
              onClick={handlerPass}
            />
          }
        />
      </Form.Field>
      <Button loading={loading} type="submit">
        Cambiar Contraseña
      </Button>
    </Form>
  );
}
