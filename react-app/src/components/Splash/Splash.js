
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LoginModal from './Modals/LoginModal/LoginModal';
import SignupModal from './Modals/SignupModal/SignupModal';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import './Splash.css'

const Splash = () => {

    const [loginMode, setLoginMode] = useState(false)
    const [signupMode, setSignupMode] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const demoLogin = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(`demo@demo.com`, `password`));
      if (!data) {
        history.push('/create')
      }
    };

    let userId, sessionUser
    sessionUser = useSelector(state => state.session.user);
    if (sessionUser) userId = sessionUser.id

    return (
        <>
            <LoginModal
                loginMode={loginMode}
                setLoginMode={setLoginMode}
            />
            <SignupModal
                signupMode={signupMode}
                setSignupMode={setSignupMode}
            />
        <div id="flex__container">
                <div className="flex-child flex-50">
                    <div className="splash-nav-content">
                        <div className="title">
                            <h1 id='title-groggo'>Groggo</h1>
                            <h3 id='title-needs-coffee'>Needs Coffee</h3>
                        </div>
                        <div className="button-area">

                            {userId ?
                                <>
                                    <NavLink to='/visualizer'  className='big-button' exact={true} activeClassName='active'>Dijkstra Visualizer</NavLink>
                                    <NavLink to='/learn' className='big-button' exact={true} activeClassName='active'>View On Github</NavLink>
                                    <LogoutButton styleLike='big-button' />
                                </>
                                :
                                <>
                                    <button className='big-button' onClick={demoLogin}>Demo Site</button>
                                    <button className='big-button' onClick={()=>setSignupMode(true)}>Sign Up</button>
                                    <button className='big-button' onClick={() => setLoginMode(true)}>Log In</button>
                                    <NavLink to='/learn' className='big-button' exact={true} activeClassName='active'>View On Github</NavLink>
                                </>
                            }
                        </div>
                    </div>
            </div>
              <div className="flex-child flex-50">
                <div className="groggo-image"></div>
              </div>
        </div>

    </>
    )
}

export default Splash
