import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { NavBar } from './NavBar';

export default {
  component: NavBar,
  title: 'NavBar',
};

storiesOf('NavBar', module)
  .addDecorator(StoryRouter())
  .add('guest', () => (
    <NavBar isAuthenticated={false} />
  ))
  .add('user', () => (
    <NavBar isAuthenticated />
  ));
