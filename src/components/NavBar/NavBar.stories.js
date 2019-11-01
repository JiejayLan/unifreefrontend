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
  ), {
    notes: 'Guest user (who need to signup or signin) will see both login and signup buttons.',
  })
  .add('user', () => (
    <NavBar isAuthenticated />
  ), {
    notes: 'User who signin will see logout button.',
  });
