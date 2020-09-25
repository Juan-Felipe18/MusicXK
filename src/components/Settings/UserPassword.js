import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";

export default function UserPassword(props) {
  const { setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Cambiar contraseña");
    setContentModal(<ChangePassword />);
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
  const [showPass, setShowPass] = useState(false);

  const handlerPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = () => {
    console.log("Cambiando Contraseña");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Contraseña Acutual"
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
          icon={
            <Icon
              name={showPass ? "eye slash outline" : "eye"}
              link
              onClick={handlerPass}
            />
          }
        />
      </Form.Field>
      <Button type="submit">Cambiar Contraseña</Button>
    </Form>
  );
}
