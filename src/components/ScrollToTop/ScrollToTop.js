import React from 'react';
import PropTypes from 'prop-types';
import { Zoom, useScrollTrigger } from '@material-ui/core';
import { useStyles } from './style';

export const ScrollToTop = (props) => {
  const { children, scrollStep, delayInMS } = props;
  const classes = useStyles();
  let intervalId;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTopStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll({
      left: 0,
      top: window.pageYOffset - scrollStep,
    });
  };

  const handleClick = () => {
    intervalId = setInterval(scrollToTopStep, delayInMS);
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

ScrollToTop.propTypes = {
  children: PropTypes.element.isRequired,
  scrollStep: PropTypes.number.isRequired,
  delayInMS: PropTypes.number.isRequired,
};
