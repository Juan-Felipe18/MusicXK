import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./AddAlbumForm.scss";
import noImg from "../../../assets/png/no-image.png";

const db = firebase.firestore(firebase);

function AddAlbumForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [artists, setArtists] = useState([]);
  const [albumImg, setAlbumImg] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtist = [];
        map(response?.docs, (artista) => {
          const data = artista.data();
          arrayArtist.push({
            key: artista.id,
            value: artista.id,
            text: data.name,
          });
        });
        setArtists(arrayArtist);
      });
  }, []);

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

  const uploadImg = (fileName) => {
    const ref = firebase.storage().ref().child(`album/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning("El nombre del album y el artista son obligatorios");
    } else if (!file) {
      toast.warning("La imagen del album es obligatoria");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImg(fileName)
        .then(() => {
          db.collection("albums")
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: fileName,
            })
            .then(() => {
              toast.success("Album Creado");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.warning("Error al crear el album");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.warning("Error al subir la imagen");
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setAlbumImg(null);
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
          <Input
            placeholder="Nombre del Album"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="El album pertenece ..."
            search
            fluid
            selection
            lazyLoad
            options={artists}
            onChange={(e, data) =>
              setFormData({ ...formData, artist: data.value })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit" loading={isLoading}>
        Crear Album
      </Button>
    </Form>
  );
}

export default AddAlbumForm;

function initialValueForm() {
  return {
    name: "",
    artist: "",
  };
}
