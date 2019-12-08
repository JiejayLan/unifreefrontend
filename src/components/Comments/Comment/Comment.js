import React, { useState } from 'react';
import {
  Typography, Avatar, ListItem, ListItemAvatar, ListItemText, Button,
} from '@material-ui/core';
import useStyles from './style';
import { ViewReplies } from '../../Replies/ViewReplies';

export const Comment = (props) => {
  const { comment } = props;
  const [replyStatus, changeReplyStatus] = useState(false);

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
            <Typography className={classes.content}>
              {comment.content}
            </Typography>
            )}
        />
      </ListItem>
      <Button
        type="submit"
        className={classes.showReply}
        onClick={() => { changeReplyStatus(!replyStatus); }}
      >
        {replyStatus ? 'HIDE REPLY' : 'SHOW REPLY'}

      </Button>
      {replyStatus && <ViewReplies replies={comment.reply} />}
    </div>
  );
};
