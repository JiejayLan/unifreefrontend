import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';


const path = '/api/v1/signup';
const domain = config.api_domain;

export const SignUpForm = () => {
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
        window.localStorage.jwtToken = jwtToken;
        setIsSignedUp(true);
      } else if (response.status && response.status === 'error') {
        setErrorMsg('Invalid username or password');
        setIsError(true);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      {handleIsSignedUp()}
      <h1>Sign Up</h1>
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          placeholder="email"
          label="Email"
          name="email"
          autoComplete="on"
          value={formData.email}
          validators={['required', 'isEmail']}
          onChange={handleChange}
        />
        <TextValidator
          placeholder="username"
          label="Username"
          name="username"
          value={formData.username}
          validators={['required']}
          onChange={handleChange}
        />
        <TextValidator
          placeholder="password"
          label="Password"
          name="password"
          validators={['required']}
          onChange={handleChange}
        />
        {handleIsError()}
        <Button type="submit">Submit</Button>
      </ValidatorForm>
    </div>
  );
};
