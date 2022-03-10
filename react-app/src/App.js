import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MobileOverlay from './components/Splash/MobileOverlay';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/Navigation/Navigation';
// import UsersList from './components/UsersList';
// import User from './components/User';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Splash from './components/Splash/Splash';
import MapBuilder from './components/MapBuilder/MapBuilder'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <div id='main__content'>
      <MobileOverlay/>
      <Switch>
        <Route path='/' exact={true} >
          <Splash/>
        </Route>
        {/* <Route path='/login' exact={true}>
          <Splash />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/visualizer' exact={true} >
          <MapBuilder/>
        </ProtectedRoute>
        <Route path="*">
            <Redirect to='/'/>
          </Route>
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
