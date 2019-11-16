import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ScrollToTop } from './ScrollToTop';

export default {
  component: ScrollToTop,
  title: 'ScrollToTop',
};

storiesOf('ScrollEvents', module)
  .add('ScrollToTop', withInfo({
    text: 'description: Wrapper component to make scroll back to top',
    inline: true,
    source: false,
  })(() => (
    <>
      { [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 3, 4, 5, 6, 7, 8, 9, 0].map((element) => <p>{element}</p>) }
      <ScrollToTop scrollStep={200} delayInMS={16.6}>
        <button type="submit"><p>up</p></button>
      </ScrollToTop>
    </>
  )));
