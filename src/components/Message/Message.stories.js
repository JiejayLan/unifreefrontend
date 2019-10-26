import React from 'react';
import { action } from '@storybook/addon-actions';
import { Message } from './Message';

// export title of the component
export default { title: 'Message' };

// write a story for this component
export const withText = () => <Message />;

export const withButton = () => <button type="submit" onSubmit={action('clicked')}>Example</button>;
