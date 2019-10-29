import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import config from '../../config';


export const TokenVerifyPage = () => {
  const [tokenData, setTokenData] = useState({ username: cookie.load('username').username, token: '' });
  const [tokenMessage, setTokenMessage] = useState('');


  const path = '/api/v1/signup/verify';
  const domain = config.apiDomain;

  function handleChange(event) {
    const updateTokenData = { ...tokenData };
    updateTokenData[event.target.name] = event.target.value;
    setTokenData(updateTokenData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (tokenData.token === '') {
      setTokenMessage('Please fill in the token');
    }
    axios.post(domain + path,
      JSON.stringify(tokenData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.data.isValidToken === true) {
          // suppose to direct to the log in page
          window.location = '/';
        } else {
          setTokenMessage('Wrong Token, Please Re-enter');
          setTokenData({ username: cookie.load('username').username, token: '' });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return (
    <div>
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
