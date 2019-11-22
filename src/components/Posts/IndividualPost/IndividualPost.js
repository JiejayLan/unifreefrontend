import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Chip,
} from '@material-ui/core';
import cookie from 'react-cookies';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';
import config from '../../../config';
import { DeletePost } from '../DeletePost';
import { EditPostForm } from '../../Forms/EditPostForm';
import { useStateValue } from '../../StateProvider';

const path = '/api/v1/user/getpostbyid?';
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

export const IndividualPost = () => {
  const classes = useStyles();
  const [{ post }, dispatch] = useStateValue();
  const [errorInfo, setErrorInfo] = useState({ isError: false, errorMsg: null });

  useEffect(() => {
    const urls = window.location.href;
    const postId = urls.slice(urls.lastIndexOf('/') + 1, urls.length);
    const token = cookie.load('jwtToken');
    const postHeaders = { Authorization: token };
    const fetchPost = async () => {
      try {
        const requestPayload = preparePayload('get', postHeaders,
          { postID: postId });
        const response = await serviceRequest(requestPayload);
        const isValidPost = response.status && response.status === 'success';
        if (isValidPost) {
          dispatch({
            type: 'changePost',
            newPost: response.data,
          });
        } else {
          throw new Error('Internal Service Error');
        }
      } catch (err) {
        const newErrorInfo = {
          isError: true,
          errorMsg: 'Internal Service Error, Please Return to the Home Page',
        };
        setErrorInfo(newErrorInfo);
      }
    };
    fetchPost();
    // eslint-disable-next-line
  }, [post]);

  return (
    <Container maxWidth="lg">
      {errorInfo.isError && (<ErrorMessage message={errorInfo.errorMsg} styles={{ color: 'red' }} />)}
      <div>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          className={classes.title}
          gutterBottom
        >
          {post.title}
        </Typography>
        {cookie.load('username') === post.username && (
          <>
            <DeletePost />
            <EditPostForm />
          </>
        )}

        <Typography
          component="h3"
          variant="subtitle1"
          color="inherit"
          gutterBottom
        >
          {post && `${post.updatedAt.substr(0, post.updatedAt.indexOf('T'))} `}
          by
          {` ${post && post.username}`}
          <Chip label={post.label} size="small" color="primary" className={classes.chip} />
        </Typography>
        <hr />
        <Typography
          variant="h5"
          color="inherit"
          paragraph
          className={classes.content}
        >
          {post.content}
        </Typography>
      </div>
    </Container>
  );
};
