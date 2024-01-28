import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./login-styles.css"
import { getModalDisplay, setModalDisplay } from "../../store/ui";
import { Link } from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sessionUser = useSelector(state => state.session.user);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const modalDisplay = useSelector(getModalDisplay);

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
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const handleDemoLogin = (e) => {
    dispatch(sessionActions.login( {email: 'testingstuff@gmail.com', password: 'password'}))
  }

  const openModal = (e) => {
    dispatch(setModalDisplay(!modalDisplay))
  }


return (
  <div className="page-wrapper">
      <div className="login-page">
        <div className="login-content">
          <div className="login-left">
            <div className="fb-logo">klobook</div>
              <p className="fb-connect-text">Connect with friends and the world around you on Klobook.</p>
            </div>
            <div className="login-right">
            <ul>
              {errors.map(error => <li key={error} className="error">{error}</li>)}
            </ul>
              <div className="login-right-content">
              <form className="login-form"onSubmit={handleSubmit}>
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
                  <Link to="/" id="demo-login" onClick={handleDemoLogin} href="#demo-login">Demo Login</Link>
                </div>
                <div className="create-button"><button type="button" onClick={openModal} id="create-new-account" className="create-account">Create new account</button></div>
              </form>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="footer-content">
              <div className="languages">
              English (US) &nbsp; Español &nbsp; Français (France) &nbsp;  中文(简体) &nbsp;  العربية  &nbsp; Português (Brasil) &nbsp;  Italiano &nbsp;  한국어  &nbsp; Deutsch &nbsp;  हिन्दी  &nbsp; 日本語 
            </div>
            <div className="external-links">
              Sign Up &nbsp;  &nbsp; Log In &nbsp;  &nbsp; Messenger &nbsp;  &nbsp; Klobook Lite &nbsp;  &nbsp; Video &nbsp;  &nbsp; Places &nbsp;  &nbsp; Games &nbsp;  &nbsp; Marketplace &nbsp;  &nbsp; Meta Pay &nbsp;  &nbsp; Meta Store &nbsp;  &nbsp; Meta Quest &nbsp;  &nbsp; Instagram &nbsp;  &nbsp; Threads &nbsp;  Fundraisers &nbsp;  &nbsp; Services &nbsp;  &nbsp; Voting Information Center &nbsp;  &nbsp; Privacy Policy &nbsp;  &nbsp; Privacy Center &nbsp;  &nbsp; Groups &nbsp;  &nbsp; About &nbsp;  &nbsp; Create ad &nbsp;  &nbsp; Create Page &nbsp;  &nbsp; Developers &nbsp;  &nbsp; Careers &nbsp;  &nbsp; Cookies &nbsp;  &nbsp; Ad choices &nbsp;  &nbsp; Terms &nbsp;  &nbsp; Help &nbsp;  &nbsp; Contact Uploading & Non-Users
            </div>
            <div className="copyright">
              Klodian © 2023
            </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginForm;
