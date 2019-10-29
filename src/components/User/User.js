import React, { useState } from 'react';
import cookie from 'react-cookies';

// Will be replace by the sign up page
export const User = () => {
  const [username, setUsername] = useState('');

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
          onClick={() => {
            cookie.save('username', username, { path: '/' });
            window.location = '/token';
          }}
        >
          Submit Username
        </button>
      </form>
    </div>
  );
};
