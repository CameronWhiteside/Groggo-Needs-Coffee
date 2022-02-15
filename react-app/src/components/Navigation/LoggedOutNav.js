
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  let userId, sessionUser
  sessionUser = useSelector(state => state.session.user);
  if(sessionUser) userId = sessionUser.id

  return (
    <nav className='navigation'>
      <div className='link-container'>
          <NavLink to='/' className='menu-button' exact={true} activeClassName='active'>Home</NavLink>
          <NavLink to='/login' className='menu-button' exact={true} activeClassName='active'>Login</NavLink>
          <NavLink to='/sign-up' className='menu-button' exact={true} activeClassName='active'>Sign Up</NavLink>
          <NavLink to={`/users/${userId}`}  className='menu-button' exact={true} activeClassName='active'>My Maps</NavLink>
          <NavLink to='/learn' className='menu-button' exact={true} activeClassName='active'>Learn Algorithms</NavLink>
          <NavLink to='/about' className='menu-button' exact={true} activeClassName='active'>About</NavLink>
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
