import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reAuth } from "../../utils/Api";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import alertError from "../../utils/AlertError";

export default function UserEmail(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Actualizar Email");
    setContentModal(
      <ChangeEmailForm user={user} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <div className="user-email">
      <h3>Email: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeEmailForm(props) {
  const { user, setShowModal } = props;

  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handlerPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = () => {
    if (!formData.email) {
      toast.warning("El email es el mismo");
    } else {
      setLoading(true);
      reAuth(formData.password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;

          currentUser
            .updateEmail(formData.email)
            .then(() => {
              toast.success("Email actualizado.");
              setLoading(false);
              setShowModal(false);
              currentUser.sendEmailVerification().then(() => {
                firebase.auth().signOut();
              });
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
          type="text"
          defaultValue={user.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>

      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Contraseña"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          icon={
            showPass ? (
              <Icon name="eye slash outline" link onClick={handlerPass} />
            ) : (
              <Icon name="eye" link onClick={handlerPass} />
            )
          }
        />
      </Form.Field>
      <Button loading={loading} type="submit">
        Actualizar
      </Button>
    </Form>
  );
}
