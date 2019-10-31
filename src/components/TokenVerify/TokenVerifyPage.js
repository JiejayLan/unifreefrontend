import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import config from '../../config';

export const TokenVerifyPage = () => {
  const [tokenData, setTokenData] = useState({ username: cookie.load('username').username, token: '' });
  const [redirectValid, setRedirectValid] = useState(false);
  const [tokenMessage, setTokenMessage] = useState('');

  const path = '/api/v1/signup/verify';
  const domain = config.apiDomain;

  function handleChange(event) {
    const updateTokenData = { ...tokenData };
    updateTokenData[event.target.name] = event.target.value;
    setTokenData(updateTokenData);
  }

  const renderRedirect = () => {
    if (redirectValid) {
      return <Redirect to="/" />;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`https://${domain}${path}`,
      JSON.stringify(tokenData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.data.isValidToken === true) {
          // direct to the log in page
          // window.location = '/';
          setRedirectValid(true);
        } else {
          setTokenMessage('Wrong Token, Please Re-enter');
          setTokenData({ username: cookie.load('username').username, token: '' });
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return (
    <div>
      {renderRedirect()}
      <span>Welcome </span>
      {tokenData.username}
      <p> Please enter token to verify your email!</p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          margin="normal"
          type="number"
          name="token"
          label="Token"
          placeholder="Token"
          required
          value={tokenData.token}
          onChange={handleChange}
        />
        <br />
        <Button type="submit" size="small" variant="outlined" color="primary">
          Verify token
        </Button>
      </form>
      <br />
      {tokenMessage}
    </div>
  );
};
