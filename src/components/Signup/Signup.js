import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Don't need to be review!
// Fake signup page, will later be replace by the sign up page
export const Signup = () => {
  const [username, setUsername] = useState('');

  const changePath = () => {
    window.localStorage.username = JSON.stringify(username.username).split('"').join('');
    return <Redirect to="/tokenVerify" />;
  };

  return (
    <div>
      <form>
        <input
          type="username"
          name="username"
          label="Username"
          placeholder="Username"
          required=""
          onChange={(e) => {
            setUsername({ username: e.target.value });
          }}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={changePath}
        >
          Submit Username
        </button>
      </form>
    </div>
  );
};
