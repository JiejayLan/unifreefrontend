import React, { useState } from 'react';
import {
  Typography, Avatar, ListItem, ListItemAvatar, ListItemText, Button,
} from '@material-ui/core';
import cookie from 'react-cookies';
import {
  string, shape, arrayOf, number, bool, func,
} from 'prop-types';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useStyles from './style';
import { ViewReplies } from '../../Replies/ViewReplies';
import { DeleteComment } from '../DeleteComment';

export const DisplayRepliesButton = (props) => {
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
DisplayRepliesButton.propTypes = {
  replyNum: number.isRequired,
  replyStatus: bool.isRequired,
  changeReplyStatus: func.isRequired,
};


export const Comment = (props) => {
  const { comment } = props;
  const username = cookie.load('username');
  const [replyStatus, changeReplyStatus] = useState(false);
  const commentTime = comment.createdAt.substr(0, comment.createdAt.indexOf('T'));
  const classes = useStyles();
  const avatarURL = 'http://api.adorable.io/avatar/50/';
  const replyNum = comment.reply ? comment.reply.length : 0;

  return (
    <div key={comment.commentID}>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <Avatar
            alt="profile"
            src={avatarURL + comment.username}
          />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <>
              <Typography
                component="span"
                className={classes.left}
                color="textPrimary"
              >
                {comment.username}
              </Typography>
              <Typography component="span" className={classes.right}>
                {commentTime}
              </Typography>
            </>
            )}
          secondary={(
            <>
              <Typography className={classes.content}>
                {comment.content}
              </Typography>
              <Typography component="span" className={[classes.right, classes.delete_icon].join(' ')}>
                {username === comment.username
            && <DeleteComment className={classes.right} commentID={comment.commentID} />}
              </Typography>
            </>
            )}
        />
      </ListItem>
      {replyNum > 0
      && (
      <DisplayRepliesButton
        replyNum={replyNum}
        replyStatus={replyStatus}
        changeReplyStatus={changeReplyStatus}
      />
      )}
      {replyStatus && <ViewReplies replies={comment.reply} />}
    </div>
  );
};

Comment.propTypes = {
  comment: shape({
    content: string.isRequired,
    username: string.isRequired,
    createdAt: string.isRequired,
    reply: arrayOf(shape({
      content: string,
      username: string,
      createdAt: string,
    })),
  }).isRequired,
};
