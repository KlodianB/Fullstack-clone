import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <div>
          <LoginFormPage />
        </div>
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
    </Switch>
  );
}

export default App;