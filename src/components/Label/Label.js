import React from 'react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './style';

export const Label = ({ label }) => {
  const classes = useStyles();
  const renderLabel = () => {
    if (label != null) {
      return <Chip label={label} size="small" color="primary" className={classes.chip} />;
    }
    return undefined;
  };
  return (
    <>
      { renderLabel() }
    </>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
};
