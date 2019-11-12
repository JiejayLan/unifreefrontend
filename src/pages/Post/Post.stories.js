import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Post } from './Post';

export const Default = () => <Post />;
storiesOf('Pages', module)
  .add('Post Page', withInfo({
    text: 'description: Individual Post page, import the individual post component',
    inline: false,
    source: false,
  })(() => (
    <Post />
  )));
