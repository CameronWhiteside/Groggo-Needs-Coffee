import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({setLoginMode}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['Invalid Credentials']);
    } else {
      setLoginMode(false)
      history.push('/visualizer')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <h5 className='errors' key={ind}>{error}</h5>
        ))}
      </div>
      <div className='modal-input-group'>
        <label className='modal-label' htmlFor='email'>Email</label>
        <input
          className='modal-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='modal-input-group'>
        <label className='modal-label' htmlFor='password'>Password</label>
        <input
          className='modal-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type='submit' className='modal-button modal-submit'>Login</button>
    </form>
  );
};

export default LoginForm;
