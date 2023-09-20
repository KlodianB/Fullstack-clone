import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profile';
// import LoginFormModal from '../LoginFormModal';
import './nav.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }
    return (
        <div className="navbar-container">
          <NavLink className="logo" exact to="/">FB</NavLink> {/* Simple text logo. Replace with an image for a more realistic look. */}
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-search"></i> {/* FontAwesome search icon */}
          </div>
          <ul>
            <li>
              <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
              <i className="fa-solid fa-bell"></i> {/* Notification icon */}
            </li>
            <li>
              <i className="fa-solid fa-comment-alt"></i> {/* Message icon */}
            </li>
            <li>
              {sessionLinks}
            </li>
          </ul>
        </div>
      );
      
    
}

export default Navigation;
