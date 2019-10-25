import { configure } from '@storybook/react';

/**
 * That will load all the stories underneath your ../src directory 
 * that match the pattern *.stories.js
 * @see https://storybook.js.org/docs/guides/guide-react/
 */
configure(require.context('../src', true, /\.stories\.js$/), module);
