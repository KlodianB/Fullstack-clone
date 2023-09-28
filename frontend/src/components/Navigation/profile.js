import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div onClick={openMenu} className="menu-button">
        <img src={user.profilePicture} className="pfp"></img>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <NavLink to={`/users/${user.id}`}><li className="first">
            <img src={user.profilePicture} className="pfp"></img>
            {`${user.firstName} ${user.lastName}`}
            </li></NavLink>
          <li onClick={logout}>
          <i class="fa-solid fa-right-from-bracket fa-lg"></i> Log Out
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
