import React from 'react';
import { string, shape } from 'prop-types';
import './Task.css';

export function Task({ task: { title, state, checked } }) {
  return (
    <div className={`list-item ${state}`}>
      <input type="checkbox" checked={checked} />
      <span>{ title }</span>
    </div>
  );
}


Task.propTypes = {
  task: shape({
    title: string.isRequired,
    state: string.isRequired,
  }).isRequired,
};
