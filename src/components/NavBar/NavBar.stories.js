import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withInfo } from '@storybook/addon-info';
import { NavBar } from './NavBar';

export default {
  component: NavBar,
  title: 'NavBar',
};

storiesOf('NavBar', module)
  .addDecorator(StoryRouter())
  .add('guest ',
    withInfo({
      text: 'description: Guest user (who need to signup or signin) will see both login and signup buttons',
      inline: true,
      source: false,
    })(() => (
      <NavBar isAuthenticated={false} />
    )))
  .add('login user',
    withInfo({
      text: 'User who signin will see logout button.',
      inline: true,
      source: false,
    })(() => (
      <NavBar isAuthenticated />
    )));
