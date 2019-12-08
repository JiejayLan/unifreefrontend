import React from 'react';
import {
  Typography, Avatar, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import { string, shape, arrayOf } from 'prop-types';
import cookie from 'react-cookies';
import useStyles from './style';
import { ViewReplies } from '../../Replies/ViewReplies';
import { DeleteComment } from '../DeleteComment';

export const Comment = (props) => {
  const { comment } = props;
  const username = cookie.load('username');
  const commentTime = comment.createdAt.substr(0, comment.createdAt.indexOf('T'));
  const classes = useStyles();
  const avatarURL = 'http://api.adorable.io/avatar/50/';
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
      <ViewReplies replies={comment.reply} />
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
