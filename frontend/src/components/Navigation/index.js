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
        <NavLink to="/">Sign Up</NavLink>
      </>
    );
  }
    return (
        <div className="navbar-container">
          <div className='left-nav'>
            <div className='logo-container'>
              <NavLink className="logo" exact to="/">FB</NavLink> {/* Simple text logo. Replace with an image for a more realistic look. */}
            </div>
            <div className="search-container">
              <input type="text" placeholder="Search" />
              <i className="fa-solid fa-search"></i> {/* FontAwesome search icon */}
            </div>
          </div>
          <div className='middle'>
          <i className="fa-solid fa-house"></i>
          </div>
          <div className='right-nav'>
              {sessionLinks}
          </div>
        </div>
      );
      
    
}

export default Navigation;
