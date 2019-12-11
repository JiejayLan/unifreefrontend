import React from 'react';
import { Chip } from '@material-ui/core';
import { string } from 'prop-types';

export const Label = ({ label, style }) => {
  const renderLabel = () => {
    if (label) {
      return <Chip label={label} size="small" color="primary" className={style} />;
    }
    return <span />;
  };
  return (
    <>
      { renderLabel() }
    </>
  );
};

Label.defaultProps = {
  style: '',
};

Label.propTypes = {
  label: string.isRequired,
  style: string,
};
