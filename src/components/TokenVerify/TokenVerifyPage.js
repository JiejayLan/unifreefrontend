import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { serviceRequest } from '../../services/serviceRequest';
import config from '../../config';

const useStyles = makeStyles({
  '@global': {
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        margin: 0,
      },
      '&[type=number]': {
        '-webkit-appearance': 'textfield',
        '-moz-appearance': 'textfield',
      },
    },
  },
});

const path = '/api/v1/signup/verify';
const domain = config.apiDomain;

function preparePayload(method, data) {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    data,
  };
}

export const TokenVerifyPage = () => {
  const classes = useStyles();
  const [tokenData, setTokenData] = useState({ username: window.localStorage.username, token: '' });
  const [redirectValid, setRedirectValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const updateTokenData = { ...tokenData };
    updateTokenData[event.target.name] = event.target.value;
    setTokenData(updateTokenData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!tokenData.token || !tokenData.username) { return; }
    try {
      const requestPayload = preparePayload('post', tokenData);
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        if (response.data.isValidToken === true) {
          setRedirectValid(true);
        } else {
          setErrorMessage('Wrong Token, Please Re-enter');
          setTokenData({ username: window.localStorage.username, token: '' });
        }
      } else if (response.status && response.status === 'error') {
        setErrorMessage('Invalid Username');
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      setErrorMessage('Internal Service Error');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        {redirectValid && <Redirect to="/" />}
        <h1>
          <span>Welcome</span>
        </h1>
        <h3> Please enter token to verify your email!</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            defaultValue={tokenData.username}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="token"
            label="Token"
            name="token"
            type="number"
            value={tokenData.token}
            onChange={handleChange}
            className={classes.input}
          />
          <br />
          <Button
            type="submit"
            fullWidth
            size="small"
            variant="contained"
            color="primary"
          >
            Verify token
          </Button>
        </form>
        <br />
        <p>{errorMessage}</p>
      </div>
    </Container>
  );
};
