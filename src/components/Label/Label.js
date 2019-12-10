import React from 'react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './style';

export const Label = ({ label }) => {
  const classes = useStyles();
  const hasLabel = label !== '';
  return (
    <>
      { hasLabel && <Chip label="school" size="small" color="primary" className={classes.chip} /> }
    </>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
};
