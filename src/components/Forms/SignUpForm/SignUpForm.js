import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  CssBaseline,
  Typography,
  Container,
  Button,
  TextField,
} from '@material-ui/core';
import cookies from 'react-cookies';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import useStyles from './style';


const path = '/api/v1/signup';
const domain = config.api_domain;

export const SignUpForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleIsSignedUp() {
    if (isSignedUp) {
      return <Redirect to="/signup" />;
    }
    return null;
  }

  function handleIsError() {
    if (isError) {
      return <p>{errorMsg}</p>;
    }
    return null;
  }

  function handleChange(event) {
    const updatedForm = { ...formData };
    updatedForm[event.target.name] = event.target.value;
    setFormData(updatedForm);
  }

  function preprarePayload(method, data) {
    const url = `https://${domain}${path}`;
    return {
      method,
      url,
      data,
    };
  }

  async function handleSubmit() {
    // eslint-disable-next-line no-useless-catch
    try {
      const reqInfo = preprarePayload('post', formData);
      const response = await serviceRequest(reqInfo);
      if (response.status && response.status === 'success') {
        const { data } = response;
        const jwtToken = `bearer ${data.token}`;
        const expirationTime = 60 * 60 * 24; //  24 hours
        window.localStorage.jwtToken = jwtToken;
        cookies.save('jwtToken', jwtToken, { path: '/', maxAge: expirationTime });
        setIsSignedUp(true);
      } else if (response.status && response.status === 'error') {
        setErrorMsg('Invalid username or password');
        setIsError(true);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (error) {
      setErrorMsg('Internal Service Error');
      setIsError(true);
    }
  }

  return (
    <Container maxWidth="sm">
      {handleIsSignedUp()}
      <CssBaseline />
      <Container className={classes.paper}>
        <ForumRoundedIcon className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="on"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            validators={['required']}
            onChange={handleChange}
          />
          {handleIsError()}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Container>
  );
};
