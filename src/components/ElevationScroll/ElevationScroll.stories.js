import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ElevationScroll } from './ElevationScroll';

export default {
  component: ElevationScroll,
  title: 'ElevationScroll',
};

storiesOf('ScrollEvents', module)
  .add('Default', withInfo({
    text: 'description: Wrapper component to make navbar not scroll',
    inline: true,
    source: false,
  })(() => <ElevationScroll><p>Test</p></ElevationScroll>));
