import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { ErrorMessage } from '../../ErrorMessage';

const errorMsg = 'Invalid username or password';
const path = '/api/v1/signin';
const domain = config.api_domain.replace('\'', '');

export const SignInForm = () => {
  const [formData, setForm] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleChange(event) {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  }

  function preparePayload(method, data) {
    const url = domain + path;
    console.log(domain, path, url);
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
      console.log(requestPayload);
      if (response.status && response.status === 'success') {
        const { data } = response;
        const jwtToken = `bearer ${data.token}`;
        window.localStorage.jwtToken = jwtToken;
        setIsLogin(true);
      } else if (response.errors) {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <>
      {isLogin && <Redirect to="/" />}
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
