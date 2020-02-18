import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Index from "views/Index.jsx";
import UserDetails from "./components/user-details/UserDetails";
import EventDetails from "./components/event/EventDetails";
import TipoEventoDetails from "./components/tipo-evento/TipoEventoDetails";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={props => <Index {...props} />} />
      <Route path="/user-details/:id" render={props => <UserDetails {...props} />} />
      <Route path="/new-user" render={props => <UserDetails {...props} />} />
      <Route path="/new-event" render={props => <EventDetails {...props} />} />
      <Route path="/new-type-event" render={props => <TipoEventoDetails {...props} />} />
    <Route path="/new-type-details/:id" render={props => <TipoEventoDetails {...props} />} />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
