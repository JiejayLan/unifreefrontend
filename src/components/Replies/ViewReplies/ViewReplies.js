import React from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  arrayOf,
  shape,
  string,
  number,
} from 'prop-types';
import useStyles from './style';

export const ViewReplies = ({ commentID, replies }) => {
  const classes = useStyles();
  const avatarURL = 'http://api.adorable.io/avatar/50/';

  return (
    replies && replies.map((reply) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListItem data-testid="replyList" className={classes.reply} key={`${commentID}-${reply.username}`} m={1}>
        <ListItemAvatar>
          <Avatar
            alt="profile"
            src={avatarURL + reply.username}
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
                {reply.username}
              </Typography>
              <Typography component="span" className={classes.right}>
                {reply.createdAt.substr(0, reply.createdAt.indexOf('T'))}
              </Typography>
            </>
          )}
          secondary={(
            <Typography className={classes.content}>
              {reply.content}
            </Typography>
          )}
        />
      </ListItem>
    ))
  );
};


ViewReplies.defaultProps = {
  replies: [],
};

ViewReplies.propTypes = {
  commentID: number.isRequired,
  replies: arrayOf(shape({
    content: string,
    username: string,
    createdAt: string,
  })),
};
