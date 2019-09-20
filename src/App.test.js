import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div1 = document.createElement('div');
  ReactDOM.render(<App />, div1);
  ReactDOM.unmountComponentAtNode(div1);
});
