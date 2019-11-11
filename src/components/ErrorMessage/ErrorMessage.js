
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';

export const ErrorMessage = (props) => {
  const { message, styles } = props;
  return (
    <Box component="span" m={1}>
      <Button data-testid="errorMsg" style={styles}>{message}</Button>
    </Box>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  /* eslint-disable react/require-default-props */
  /* eslint-disable react/forbid-prop-types */
  styles: PropTypes.object,
};
