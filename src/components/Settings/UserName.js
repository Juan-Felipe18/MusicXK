import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserName(props) {
  const {
    user,
    setShowModal,
    setTitleModal,
    setContentModal,
    setReloadApp,
  } = props;

  const onEdit = () => {
    setTitleModal("Actualizar Usuario");
    setContentModal(
      <ChangeDisplayForm
        setShowModal={setShowModal}
        displayName={user.displayName}
        setReloadApp={setReloadApp}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeDisplayForm(props) {
  const { displayName, setShowModal, setReloadApp } = props;

  const [formData, setFormData] = useState({ displayName: displayName });
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      setLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: formData.displayName,
        })
        .then(() => {
          setReloadApp((prev) => !prev);
          toast.success("User Name Actualizado");
          setLoading(false);
          setShowModal(false);
        })
        .catch(() => {
          toast.error("Error al acualizar Nombre");
          setLoading(false);
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type={"submit"} loading={loading}>
        Actualizar
      </Button>
    </Form>
  );
}
