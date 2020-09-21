import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

//page

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artistas" exact>
        <h1>Artistas</h1>
      </Route>
      <Route path="/settings" exact>
        <h1>Settings of count</h1>
      </Route>
    </Switch>
  );
}
