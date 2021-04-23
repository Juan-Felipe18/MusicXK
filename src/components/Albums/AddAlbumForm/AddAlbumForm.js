import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";

import "./AddAlbumForm.scss";
import noImg from "../../../assets/png/no-image.png";

function AddAlbumForm(props) {
  const { setShowModal } = props;

  const [albumImg, setAlbumImg] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setAlbumImg(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    console.log("Enviando formulario ...");
    console.log(file);
  };

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{
              backgroundImage: `url(${albumImg})`,
            }}
          />
          <input {...getInputProps()} />
          {!albumImg && <Image src={noImg} />}
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input placeholder="Nombre del Album" />
          <Dropdown placeholder="El album pertenece ..." search />
        </Form.Field>
      </Form.Group>
      <Button type="submit">Crear Album</Button>
    </Form>
  );
}

export default AddAlbumForm;
