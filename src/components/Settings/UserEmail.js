import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";

export default function UserEmail(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Actualizar Email");
    setContentModal(<ChangeEmailForm user={user} />);
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
  const { user } = props;

  const [showPass, setShowPass] = useState(false);

  const handlerPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = () => {
    console.log("formulario enviado");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input type="text" defaultValue={user.email} />
      </Form.Field>

      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            showPass ? (
              <Icon name="eye" link onClick={handlerPass} />
            ) : (
              <Icon name="eye slash outline" link onClick={handlerPass} />
            )
          }
        />
      </Form.Field>
    </Form>
  );
}
