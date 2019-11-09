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
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';


const path = '/api/v1/signup';
const domain = config.api_domain;
const emailPattern = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+.edu$/;
const usernamePattern = /^[A-Za-z0-9_!$%&*+=?`{|}~^.-]/;
const passwordPattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

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
    return isSignedUp ? <Redirect to="/tokenVerify" /> : null;
  }

  function handleIsError() {
    return isError ? <ErrorMessage message={errorMsg} /> : null;
  }

  function handleChange(event) {
    const updatedForm = { ...formData };
    updatedForm[event.target.name] = event.target.value;
    setFormData(updatedForm);
  }

  function isValid() {
    return emailPattern.test(formData.email)
      && usernamePattern.test(formData.username)
      && passwordPattern.test(formData.password);
  }

  function getValidationError() {
    if (!emailPattern.test(formData.email)) {
      return 'Invalid email. You must use a college email.';
    }
    if (!usernamePattern.test(formData.username)) {
      return 'Invalid username';
    }
    if (!passwordPattern.test(formData.password)) {
      return `Invalid password.\n
      Passwords must be at least 6 characters long and contain 2 of the following:\n
      * Lowercase alphabetic character\n
      * Uppercase alphabetic character\n
      * digits 0 - 9
      `;
    }
    return 'Internal Service Error';
  }

  function preprarePayload(method, data) {
    const url = `https://${domain}${path}`;
    return {
      method,
      url,
      data,
    };
  }

  async function submitForm() {
    try {
      const reqInfo = preprarePayload('post', formData);
      const response = await serviceRequest(reqInfo);
      if (response.status && response.status === 'success') {
        const { data } = response;
        const username = `bearer ${data.username}`;
        const expirationTime = 60 * 60 * 24; //  24 hours
        cookies.save('username', username, { path: '/', maxAge: expirationTime });
        setIsSignedUp(true);
      } else if (response.status && response.status === 'error') {
        setErrorMsg(response.message);
        setIsError(true);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!isValid()) {
        setIsError(true);
        setErrorMsg(getValidationError());
      } else {
        await submitForm();
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
            autoFocus
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
            type="password"
            label="Password"
            name="password"
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
