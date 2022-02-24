import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({setSignupMode}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data.map(entry => entry.split(": ")[1]))
      } else {
        setSignupMode(false)
        history.push('/visualizer')
      }
    } else {
      setErrors(['Passwords do not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id='signup' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <h5 className='errors' key={ind}>{error}</h5>
        ))}
      </div>
      <div className='modal-input-group'>
        <label className='modal-label'>User Name</label>
        <input
          className='modal-input'
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div className='modal-input-group'>
        <label className='modal-label'>Email</label>
        <input
          className='modal-input'
          type='email'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div className='modal-input-group'>
        <label className='modal-label' >Password</label>
        <input
          className='modal-input'
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div className='modal-input-group'>
        <label className='modal-label'>Repeat Password</label>
        <input
          className='modal-input'
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit' className='modal-button modal-submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
