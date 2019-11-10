import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import cookie from 'react-cookies';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';
import config from '../../../config';

const path = '/api/v1/user/getpostbyid?';
const domain = config.apiDomain;

function preparePayload(method, headers, params) {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers,
    params,
  };
}

export const IndividualPost = () => {
  const classes = useStyles();

  const [post, setPost] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const urls = window.location.href;
    const postId = urls.slice(urls.lastIndexOf('/') + 1, urls.length);
    const token = cookie.load('jwtToken');
    const postHeaders = { Authorization: token };

    async function fetchPosts() {
      const requestPayload = preparePayload('get', postHeaders,
        { postID: postId });
      try {
        const response = await serviceRequest(requestPayload);
        if (response.status && response.status === 'success') {
          setPost(response.data);
        } else if (response.status && response.status === 'error') {
          setIsError(true);
          setErrorMsg('Internal Service Error, Please Return to the Home Page');
        } else {
          throw new Error('Internal Service Error');
        }
      } catch (err) {
        setIsError(true);
        setErrorMsg('Internal Service Error, Please Return to the Home Page');
      }
    }
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="lg">
      {isError && (<ErrorMessage message={errorMsg} styles={{ color: 'red' }} />)}
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
        <Typography
          component="h3"
          variant="subtitle1"
          color="inherit"
          gutterBottom
        >
          {post && `${post.updatedAt.substr(0, post.updatedAt.indexOf('T'))} `}
          by
          {` ${post && post.username}`}
          <Chip
            label={post.label}
            size="small"
            color="primary"
            variant="outlined"
            className={classes.chip}
          />
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
