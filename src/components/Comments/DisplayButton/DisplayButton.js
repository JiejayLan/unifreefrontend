import React from 'react';
import {
  Button,
} from '@material-ui/core';

import {
  number, bool, func,
} from 'prop-types';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useStyles from './style';


export const DisplayButton = (props) => {
  const { replyNum, replyStatus, changeReplyStatus } = props;
  const classes = useStyles();
  return (
    <Button
      type="submit"
      className={classes.button}
      onClick={() => { changeReplyStatus(!replyStatus); }}
    >
      {replyStatus ? (
        <>
          HIDE REPLY
          <ArrowUpwardIcon fontSize="small" />
        </>
      ) : (
        <>
          {`${replyNum} replies`}
          <ArrowDownwardIcon fontSize="small" />
        </>
      )}
    </Button>
  );
};
DisplayButton.propTypes = {
  replyNum: number.isRequired,
  replyStatus: bool.isRequired,
  changeReplyStatus: func.isRequired,
};
