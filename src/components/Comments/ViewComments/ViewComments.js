import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import {
  Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import useStyles from './style';
import { ErrorMessage } from '../../ErrorMessage';
import { serviceRequest } from '../../../services/serviceRequest';
import { useStateValue } from '../../StateProvider';
import { Pagination } from '../../Pagination';
import { ReplyForm } from '../../Forms/ReplyForm';
import config from '../../../config';

const path = '/api/v1/post/viewcomments?';
const domain = config.apiDomain;

const preparePayload = (method, headers, params) => {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers,
    params,
  };
};

export const ViewComments = () => {
  const classes = useStyles();
  const [{ comments, page }, dispatch] = useStateValue();
  const [errorInfo, setErrorInfo] = useState({ isError: false, errorMsg: null });
  const avatarURL = 'http://api.adorable.io/avatar/50/';

  const urls = window.location.href;
  const postId = urls.slice(urls.lastIndexOf('/') + 1, urls.length);
  const token = cookie.load('jwtToken');
  const commentHeaders = { Authorization: token };

  const handleSuccessData = (data) => {
    const { comments: newComments, totalPages } = data;
    dispatch({
      type: 'changeComment',
      newComments,
    });
    dispatch({
      type: 'changePage',
      newPage: { totalPages },
    });
  };

  const fetchAllComments = async () => {
    try {
      const requestPayload = preparePayload('get', commentHeaders,
        { postID: postId, currentPage: page.currentPage, pageSize: page.pageSize });
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        const { data } = response;
        handleSuccessData(data);
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
    // eslint-disable-next-line
  }, [page.currentPage, page.pageSize]);

  return (
    <div>
      {errorInfo.isError && (<ErrorMessage message={errorInfo.errorMsg} styles={{ color: 'red' }} />)}
      <List>
        <div className={classes.commentHeader}>COMMENTS</div>
        <hr />
        {page.totalPages > 0
          ? (
            <List>
              {comments.map((comment) => {
                const commentTime = comment.createdAt.substr(0, comment.createdAt.indexOf('T'));
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
                    <ReplyForm commentID={comment.commentID} />
                  </div>
                );
              })}
            </List>
          )
          : 'No Comment'}
      </List>
      <Pagination />
    </div>
  );
};
