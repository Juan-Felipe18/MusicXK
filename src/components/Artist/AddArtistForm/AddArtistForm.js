import React, { useCallback, useState } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import "firebase/firestore";
import NoImg from "../../../assets/png/no-image.png";

import "./AddArtistForm.scss";

const db = firebase.firestore(firebase);

export default function AddArtistForm(props) {
  const { setShowModal } = props;

  const [formData, setFormData] = useState(initialValueForm());
  const [file, setFile] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((aceptedFile) => {
    const file = aceptedFile[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImg = (fileName) => {
    const ref = firebase.storage().ref().child(`artists/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name) {
      toast.warning("Añade el nombre del artista");
    } else if (!file) {
      toast.warning("Añade la imagen del artista.");
    } else {
      setLoading(true);
      const fileName = uuidv4();
      uploadImg(fileName)
        .then(() => {
          db.collection("artists")
            .add({ name: formData.name, banner: fileName })
            .then(() => {
              toast.success("Artiasta creado correctamente.");
              resetForm();
              setLoading(false);
              setShowModal(false);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error la crear el artista.");
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al subir la imagen.");
          setLoading(false);
        });
    }
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setBanner(null);
  };

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImg} />}
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${banner ? banner : NoImg}')` }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nombre del artista"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Crear Artista
      </Button>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
  };
}
