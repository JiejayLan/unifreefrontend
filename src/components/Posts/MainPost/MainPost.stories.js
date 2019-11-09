import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { MemoryRouter } from 'react-router-dom';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import { MainPost } from './MainPost';

export const mainPost = {
  label: 'sample',
  title: 'sample title',
  content: 'This is a sample content for the sample post with sample title',
  createdAt: '2019-11-07T09:26:51.822Z',
  username: 'sampleMe',
  postID: 1,
};

storiesOf('Post', module)
  .addDecorator(StoryRouter())
  .add('Main Post',
    withInfo({
      text: 'description: Display all post on the home page',
      inline: false,
      source: false,
    })(() => (
      <MemoryRouter>
        <MainPost mainPost={mainPost} />
      </MemoryRouter>
    )),
    { notes: 'MemoryRouter used to prevent invariant error.' });
