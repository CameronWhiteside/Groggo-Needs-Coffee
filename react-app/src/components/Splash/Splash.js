
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Splash.css'

const Splash = () => {

    let userId, sessionUser
    sessionUser = useSelector(state => state.session.user);
    if (sessionUser) userId = sessionUser.id

    return (
    <>
        <div id="flex__container">
                <div className="flex-child flex-40">
                    <div className="splash-nav-content">
                        <div className="title">
                            <h1>Groggo</h1>
                            <h3>Needs coffee</h3>
                        </div>
                        <div className="button-area">
                            <NavLink to='/create'  className='big-button' exact={true} activeClassName='active'>Create Maps</NavLink>
                            <NavLink to='/learn' className='big-button' exact={true} activeClassName='active'>Learn Algorithms</NavLink>
                            <NavLink to='/about' className='big-button' exact={true} activeClassName='active'>About</NavLink>
                        </div>
                    </div>
            </div>
              <div className="flex-child flex-60">
                <div className="groggo-image"></div>
              </div>
        </div>

    </>
    )
}

export default Splash
