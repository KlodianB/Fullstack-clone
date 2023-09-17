import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./login-styles.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sessionUser = useSelector(state => state.session.user);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        debugger
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
    
//     return dispatch(sessionActions.login({ email, password }))
//       .catch((error) => {
//         if (error?.errors) {
//             setErrors(error.errors);
//         } else if (error && typeof error === 'string') {
//             setErrors([error]);
//         } else {
//             setErrors(["An unknown error occurred."]);
//         }
//     });
// };

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
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <button type="submit">Log In</button>
              <div className="links">
                  <a id="demo-login" href="#demo-login">Demo Login</a>
                  {/* Space here just for better visual spacing; can be left empty */}
                  <span></span>
              </div>
              <div className="create-button"><button type="button" className="create-account">Create New Account</button></div>
          </form>
      </>
    );
}

export default LoginForm;