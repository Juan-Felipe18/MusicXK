import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";

import "./SideMenu.scss";

function SideMenu(props) {
  const { user, location } = props;

  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);

  useEffect(() => {
    isUserAdmin(user.uid).then((res) => {
      setUserAdmin(res);
    });
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  return (
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
          <Menu.Item>
            <Icon name="plus square outline" />
            Nuevo Artista
          </Menu.Item>

          <Menu.Item>
            <Icon name="plus square outline" />
            Nueva Cancion
          </Menu.Item>
        </div>
      )}
    </Menu>
  );
}

export default withRouter(SideMenu);
