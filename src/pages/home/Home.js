import React from 'react';
import { Message } from '../../components/Message';
import { Signup } from '../../components/Signup';

export const Home = () => (
  <div>
    <h1>This is home page</h1>
    <Message />
    <Signup />
  </div>
);
