import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./login-styles.css"
import { getModalDisplay, setModalDisplay } from "../../store/ui";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sessionUser = useSelector(state => state.session.user);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const modalDisplay = useSelector(getModalDisplay)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          debugger
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const handleDemoLogin = (e) => {
    dispatch(sessionActions.login( {email: 'email@email.com', password: 'password'}))
  }

  const openModal = (e) => {
    dispatch(setModalDisplay(!modalDisplay))
  }


return (
      <>
          <form onSubmit={handleSubmit}>
              <ul>
                  {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <input
                  type="text"
                  id="login-email"
                  value={email}
                  className="credentials"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  type="password"
                  value={password}
                  className="credentials"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <button type="submit" id="login">Log In</button>
              <div className="links">
                  <a id="demo-login" onClick={handleDemoLogin} href="#demo-login">Demo Login</a>
                  {/* Space here just for better visual spacing; can be left empty */}
                  <span></span>
              </div>
              <div className="create-button"><button type="button" onClick={openModal} id="create-new-account" className="create-account">Create New Account</button></div>
          </form>
      </>
    );
}

export default LoginForm;