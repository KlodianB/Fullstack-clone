import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginPage";
import SignUpForm from "./components/SignUpForm";
import Navigation from "./components/Navigation";
import Splash from "./components/splash";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
        </Switch>
    </>
  );
}

export default App;