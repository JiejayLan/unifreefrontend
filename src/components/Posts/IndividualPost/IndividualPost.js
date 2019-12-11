import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Grid,
} from '@material-ui/core';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { serviceRequest } from '../../../services/serviceRequest';
import { CommentInput } from '../../Forms/CommentInput';
import useStyles from './style';
import config from '../../../config';
import { ViewComments } from '../../Comments/ViewComments';
import { DeletePost } from '../DeletePost';
import { EditPostForm } from '../../Forms/EditPostForm';
import { useStateValue } from '../../StateProvider';
import { Label } from '../../Label';

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
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
      }
    };
    fetchPost();
    // eslint-disable-next-line
  }, [post.title, post.content, post.label]);

  return (
    <Container maxWidth="md">
      {(post.obsolete || isError) && <Redirect to="/" />}
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
        <Grid container className={classes.root} justify="space-between">
          <Grid item>
            <Typography
              component="h3"
              variant="subtitle1"
              color="inherit"
              gutterBottom
            >
              {post && `${post.updatedAt.substr(0, post.updatedAt.indexOf('T'))} `}
              by
              {` ${post && post.username}`}
              <Label label={post.label} style={classes.chip} />
            </Typography>
          </Grid>
          {cookie.load('username') === post.username && (
            <div>
              <EditPostForm />
              <DeletePost />
            </div>
          )}
        </Grid>
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
      <CommentInput postID={post.postID} />
      <ViewComments />
    </Container>
  );
};
