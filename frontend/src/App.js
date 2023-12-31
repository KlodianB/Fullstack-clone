import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginPage";
import SignUpForm from "./components/SignUpForm";
import Navigation from "./components/Navigation";
import Splash from "./components/splash";
import { useSelector } from "react-redux";
import ProfilePage from "./components/profile";

function App() {
  const sessionUser = useSelector(state => state.session.user);
  
  return (
    <>
      {sessionUser ? <Navigation /> : null}
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="/users/:userId">
            {sessionUser ? <ProfilePage /> : <Splash />}
          </Route>
        </Switch>
    </>
  );
}

export default App;