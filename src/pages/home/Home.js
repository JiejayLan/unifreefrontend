import React from 'react';
import { Message } from '../../components/Message';
import { NavBar } from '../../components/NavBar';

export const Home = () => (
  <div>
    <NavBar isAuthenticated={false} />
    <h1>This is home page</h1>
    <Message />
  </div>
);
