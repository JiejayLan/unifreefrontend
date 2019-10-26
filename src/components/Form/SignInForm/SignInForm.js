import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';

export const SignInForm = () => {
  const [formData, setForm] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const inputRef = useRef(null);

  function handleChange(event) {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  }

  async function handleSubmit() {
    try {
      const uri = `${config.api_domain}/api/v1/signin`;
      const response = await serviceRequest({
        method: 'post',
        url: uri,
        data: {
          ...formData,
        },
      });
      if (response.status && response.status === 'success') {
        const { data } = response;
        const jwtToken = `bearer ${data.token}`;
        window.localStorage.jwtToken = jwtToken;
        setIsLogin(true);
      } else if (response.errors) {
        console.log(response.errors);
      }
    } catch (err) {
      console.log('error:', err.message);
    }
  }

  return (
    <>
      {isLogin && <Redirect to="/" />}
      <ValidatorForm
        ref={inputRef}
        onSubmit={handleSubmit}
      >
        <h2>Sign In</h2>
        <div>
          <TextValidator
            label="Username"
            onChange={handleChange}
            name="username"
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
