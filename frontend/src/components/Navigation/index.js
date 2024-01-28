import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profile';
import NavSearch from './NavSearch';
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
              <NavLink className="logo" exact to="/"><img src="/assets/klobook.png" className='pfp'></img></NavLink> 
            </div>
            <div className="search-container">
              <i className="fa-solid fa-search fa-lg"></i> 
              <NavSearch />
            </div>
          </div>
          <div className='middle'>
          <NavLink exact to="/"><i className="fa-solid fa-house fa-2xl"></i></NavLink>
          </div>
          <div className='right-nav'>
              {sessionLinks}
          </div>
        </div>
      );
      
    
}

export default Navigation;
