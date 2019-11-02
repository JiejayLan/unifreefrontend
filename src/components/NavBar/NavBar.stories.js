import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { MemoryRouter } from 'react-router-dom';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
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
      <MemoryRouter>
        <NavBar isAuthenticated={false} />
      </MemoryRouter>
    )),
    { notes: 'MemoryRouter used to prevent invariant error.' })
  .add('login user',
    withInfo({
      text: 'description: User who signin will see logout button.',
      inline: true,
      source: false,
    })(() => (
      <MemoryRouter>
        <NavBar isAuthenticated />
      </MemoryRouter>
    )),
    { notes: 'MemoryRouter used to prevent invariant error.' });
