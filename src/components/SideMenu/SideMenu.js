import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import BasicModal from "../Modal/BasicModal";
import AddArtistForm from "../Artist/AddArtistForm";
import AddAlbumForm from "../Albums/AddAlbumForm";

import "./SideMenu.scss";

function SideMenu(props) {
  const { user, location } = props;

  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid).then((res) => {
      setUserAdmin(res);
    });
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handlerModal = (type) => {
    switch (type) {
      case "artista":
        setTitleModal("Nuevo Artista");
        setContentModal(<AddArtistForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "cancion":
        setTitleModal("Nuevo Cancion");
        setContentModal(<h2>Formulario nueva Cancion</h2>);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("Nuevo Album");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      default:
        setTitleModal(null);
        setShowModal(false);
        setContentModal(null);
        break;
    }
  };

  return (
    <>
      <Menu className="side-menu" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Icon name="home" />
            Inicio
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/artistas"
            active={activeMenu === "/artistas"}
            onClick={handlerMenu}
          >
            <Icon name="music" />
            Artistas
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handlerModal("artista")}>
              <Icon name="plus square outline" />
              Nuevo Artista
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("album")}>
              <Icon name="plus square outline" />
              Nuevo Album 
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("cancion")}>
              <Icon name="plus square outline" />
              Nueva Cancion
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

export default withRouter(SideMenu);
