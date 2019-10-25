import React from 'react';
import { NavBar } from './NavBar';

export default {
  component: NavBar,
  title: 'NavBar',
};

export const guestNavBar = () => <NavBar isAuthenticated={false} />;

export const userNavBar = () => <NavBar isAuthenticated />;
