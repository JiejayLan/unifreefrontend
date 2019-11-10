import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { MemoryRouter } from 'react-router-dom';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import { Home } from './Home';

export const Default = () => <Home />;
storiesOf('Pages', module)
  .addDecorator(StoryRouter())
  .add('Home Page', withInfo({
    text: 'description: Home Page',
    inline: false,
    source: false,
  })(() => (
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )), { notes: 'MemoryRouter used to prevent invariant error.' });
