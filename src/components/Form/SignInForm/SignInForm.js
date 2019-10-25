import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const emailPattern = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+.edu$/;

export const SignInForm = () => {
  const [formData, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    ValidatorForm.addValidationRule('isValidEmail', (email) => {
      if (email) { return emailPattern.test(email); }
      return true;
    });
  });

  function handleChange(event) {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  }

  function handleSubmit() {
    console.log('submit');
  }

  const inputRef = useRef(null);

  return (
    <ValidatorForm
      ref={inputRef}
      onSubmit={handleSubmit}
    >
      <h2>Sign In</h2>
      <div>
        <TextValidator
          label="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          validators={['required', 'isValidEmail']}
          errorMessages={['this field is required', 'school email is not valid']}
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
  );
};
