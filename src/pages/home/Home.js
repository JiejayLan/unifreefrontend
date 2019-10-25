import React from 'react';
import { Message } from '../../components/Message';
import { NavBar } from '../../components/NavBar';

export const Home = () => (
  <div>
    <NavBar />
    <h1>This is home page</h1>
    <Message />
  </div>
);
