import React, { useState } from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
} from '@material-ui/core';
import {
  arrayOf,
  shape,
  string,
} from 'prop-types';
import useStyles from './style';

export const ViewReplies = ({ replies }) => {
  const classes = useStyles();
  const INCREASMENT = 10;
  const avatarURL = 'http://api.adorable.io/avatar/50/';
  const [numDisplay, changeDisplayNum] = useState(5);
  const repliesDisplay = replies.slice(0, numDisplay);
  const totalReplies = replies ? replies.length : 0;

  return (
    <div className={classes.body}>
      {replies && repliesDisplay.map((reply) => (
        <ListItem data-testid="replyList" className={classes.reply} key={`${reply.username}${reply.createdAt}`} m={1}>
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
      ))}
      {totalReplies > numDisplay
       && (
       <Button
         onClick={() => { changeDisplayNum(numDisplay + INCREASMENT); }}
       >
          SHOW MORE
       </Button>
       )}
    </div>
  );
};


ViewReplies.defaultProps = {
  replies: [],
};

ViewReplies.propTypes = {
  replies: arrayOf(shape({
    content: string,
    username: string,
    createdAt: string,
  })),
};
