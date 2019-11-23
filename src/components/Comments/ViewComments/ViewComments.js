import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import {
  Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import useStyles from './style';
import { ErrorMessage } from '../../ErrorMessage';
import { serviceRequest } from '../../../services/serviceRequest';
// import config from '../../../config';

// const path = '/api/v1/post/viewcomments';
// const domain = config.apiDomain;

const preparePayload = (method, headers, params) => {
//   const url = `https://${domain}${path}`;
  const url = 'http://localhost:8081/api/v1/post/viewcomments';
  return {
    method,
    url,
    headers,
    params,
  };
};

export const ViewComments = () => {
  const classes = useStyles();

  const [commentData, setCommentData] = useState({ comments: [] });
  const comment = commentData.comments;
  const { totalPages } = commentData;
  const [errorInfo, setErrorInfo] = useState({ isError: false, errorMsg: null });

  const urls = window.location.href;
  const postId = urls.slice(urls.lastIndexOf('/') + 1, urls.length);
  const token = cookie.load('jwtToken');
  const commentHeaders = { Authorization: token };

  const fetchAllComments = async () => {
    try {
      const requestPayload = preparePayload('get', commentHeaders,
        { postID: postId, currentPage: 1, pageSize: 7 });
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        // const { data } = response;
        console.log(response.data);
        console.log(response.data.comments);
        setCommentData(response.data);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      const newErrorInfo = {
        isError: true,
        errorMsg: 'Internal Service Error',
      };
      setErrorInfo(newErrorInfo);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);


  return (
    <div>
      {errorInfo.isError && (<ErrorMessage message={errorInfo.errorMsg} styles={{ color: 'red' }} />)}
      {totalPages > 0
        ? (
          <List>
            <div className={classes.commentHeader}>COMMENTS</div>
            <hr />
            {comment.map((comments) => (
              <ListItem key={comments.commentID} className={classes.list}>
                <ListItemAvatar>
                  <Avatar
                    alt="profile"
                    src={`http://api.adorable.io/avatar/50/${comments.username}`}
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
                        {comments.username}
                      </Typography>
                      <Typography component="span" className={classes.right}>
                        {comments.createdAt.substr(0, comments.createdAt.indexOf('T'))}
                      </Typography>
                    </>
              )}
                  secondary={(
                    <Typography className={classes.content}>
                      {comments.content}
                    </Typography>
                )}
                />
              </ListItem>
            ))}
          </List>
        )
        : ''}
    </div>
  );
};
