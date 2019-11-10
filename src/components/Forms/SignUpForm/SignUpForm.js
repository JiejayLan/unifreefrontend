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
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';

const path = '/api/v1/signup';
const domain = config.apiDomain;
const emailPattern = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+.edu$/;
const usernamePattern = /^[A-Za-z0-9_!$%&*+=?`{|}~^.-]/;
const passwordPattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const passwordPolicy = `
    Passwords must be at least 6 characters long and contain 2 of the following:
      * Lowercase character
      * Uppercase character
      * digits 0 - 9
    `;

const preprarePayload = (method, data) => {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    data,
  };
};

export const SignUpForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ isError: false, errorMsg: null });

  const handleChange = (event) => {
    const updatedForm = { ...formData };
    updatedForm[event.target.name] = event.target.value;
    setFormData(updatedForm);
  };

  const checkValidation = () => {
    if (!emailPattern.test(formData.email)) {
      return 'Invalid email. You must use a college email.';
    }
    if (!usernamePattern.test(formData.username)) {
      return 'Invalid username';
    }
    if (!passwordPattern.test(formData.password)) {
      return 'Invalid password';
    }
    return null;
  };

  const handleSignUpSuccess = (data) => {
    const username = `${data.username}`;
    const expirationTime = 60 * 30 * 1; //  30 minutes
    cookies.save('username', username, { path: '/', maxAge: expirationTime });
    setIsSignedUp(true);
  };

  const signUpRequest = async () => {
    try {
      const reqInfo = preprarePayload('post', formData);
      const response = await serviceRequest(reqInfo);
      const isSignUpSuccess = response.status && response.status === 'success';
      if (isSignUpSuccess) {
        const { data } = response;
        handleSignUpSuccess(data);
      } else {
        const newError = { isError: true, errorMsg: response.message };
        setErrorInfo(newError);
      }
    } catch (error) {
      throw error;
    }
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const validationMsg = checkValidation();
      if (validationMsg) {
        const newError = { isError: true, errorMsg: validationMsg };
        setErrorInfo(newError);
      } else {
        await signUpRequest();
      }
    } catch (error) {
      const newError = { isError: true, errorMsg: 'Internal Service Error' };
      setErrorInfo(newError);
    }
  }

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      {isSignedUp && <Redirect to="/tokenVerify" />}
      <Container className={classes.paper}>
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
            helperText={passwordPolicy}
          />
          {errorInfo.isError && <ErrorMessage message={errorInfo.errorMsg} />}
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
