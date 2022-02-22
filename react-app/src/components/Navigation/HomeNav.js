
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const HomeNav = () => {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='navigation'>
      <div className='link-container'>
          <NavLink to='/' className='menu-button' exact={true} activeClassName='active'>Home</NavLink>
          <NavLink to='/login' className='menu-button' exact={true} activeClassName='active'>Login</NavLink>
          <NavLink to='/sign-up' className='menu-button' exact={true} activeClassName='active'>Sign Up</NavLink>
          <NavLink to='/create'  className='menu-button' exact={true} activeClassName='active'>Create A Map</NavLink>
          <NavLink to='/learn' className='menu-button' exact={true} activeClassName='active'>View On Github</NavLink>
          <LogoutButton />
      </div>
    </nav>
  );
}

export default HomeNav;
