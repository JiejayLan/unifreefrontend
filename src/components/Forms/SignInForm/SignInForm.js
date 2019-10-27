import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { ErrorMessage } from '../../ErrorMessage';

const errorMsg = 'Invalid username or password';
const path = '/api/v1/signin';
const domain = config.apiDomain;

export const SignInForm = () => {
  const [formData, setForm] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    console.log(`You clicked ${isError}`);
  });
  function handleChange(event) {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  }

  function preparePayload(method, data) {
    const url = `https://${domain}${path}`;
    return {
      method,
      url,
      data,
    };
  }

  async function handleSubmit() {
    try {
      const requestPayload = preparePayload('post', formData);
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        const { data } = response;
        const jwtToken = `bearer ${data.token}`;
        window.localStorage.jwtToken = jwtToken;
        setIsLogin(true);
        console.log('click the button1', isLogin, isError);
      } else if (response.errors) {
        setIsError(true);
      }
      console.log('click the butto2', isLogin, isError);
    } catch (err) {
      setIsError(true);
      console.log('click the button3', isLogin, isError);
    }
  }


  return (
    <>
      {isLogin && <Redirect to="/hghfgh" />}
      <ValidatorForm
        onSubmit={handleSubmit}
      >
        <h2>Sign In</h2>
        {isError && <ErrorMessage message={errorMsg} />}
        <div>
          <TextValidator
            label="Username"
            onChange={handleChange}
            name="username"
            autoComplete="on"
            value={formData.username}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </div>
        <div>
          <TextValidator
            label="Password"
            onChange={handleChange}
            name="password"
            type="password"
            autoComplete="on"
            value={formData.password}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          type="submit"
        >
          {'Submit'}
        </Button>
      </ValidatorForm>
    </>
  );
};
