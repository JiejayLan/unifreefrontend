import React from 'react';
import { string } from 'prop-types';

export const ErrorMessage = (props) => {
  const { message } = props;
  return (<div>{message}</div>);
};

ErrorMessage.propTypes = {
  message: string.isRequired,
};
