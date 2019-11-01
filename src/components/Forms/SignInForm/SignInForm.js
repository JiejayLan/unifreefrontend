import './SignInForm.scss';
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { ErrorMessage } from '../../ErrorMessage';

const path = '/api/v1/signin';
const domain = config.apiDomain;

function preparePayload(method, data) {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    data,
  };
}

export const SignInForm = () => {
  const [formData, setForm] = useState({ username: null, password: null });
  const [isLogin, setIsLogin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Invalid username or password');

  function handleChange(event) {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.password || !formData.username) { return; }
    try {
      const requestPayload = preparePayload('post', formData);
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        const { data } = response;
        const jwtToken = `bearer ${data.token}`;
        window.localStorage.jwtToken = jwtToken;
        setIsLogin(true);
      } else if (response.status && response.status === 'error') {
        setErrorMsg('Invalid username or password');
        setIsError(true);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      setErrorMsg('Internal Service Error');
      setIsError(true);
    }
  }
  return (
    <Container component="main" maxWidth="xs" className="root">
      {isLogin && <Redirect to="/" />}
      <CssBaseline />
      <div className="wrapper">
        <Avatar className="avatar">
          <LockOutlinedIcon className="icon" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {isError && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};
