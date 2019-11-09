import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import cookie from 'react-cookies';
import { Link, Redirect } from 'react-router-dom';
import { serviceRequest } from '../../../services/serviceRequest';
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
  const [postIdParams] = useState({ postID: 17 });
  const token = cookie.load('jwtToken');
  const postHeaders = { Authorization: token };
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const requestPayload = preparePayload('get', postHeaders, postIdParams);
      const response = await serviceRequest(requestPayload);
      try {
        if (response.status && response.status === 'success') {
          setPost(response.data);
        } else if (response.status && response.status === 'error') {
          setIsError(true);
        } else {
          throw new Error('Internal Service Error');
        }
      } catch (err) {
        setIsError(true);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {isError && <Redirect to="/" />}
      <Button variant="text" color="primary" component={Link} to="/">
        <KeyboardBackspaceIcon fontSize="large" />
      </Button>
      <Container maxWidth="lg">
        <div>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {post.title}
          </Typography>
          <Typography
            component="h3"
            variant="subtitle1"
            color="inherit"
            gutterBottom
          >
            {post
              && `${
                post.updatedAt
                  ? post.updatedAt.substr(0, post.updatedAt.indexOf('T'))
                  : post.createdAt.substr(0, post.createdAt.indexOf('T'))
              } 
                            by ${post && post.username}`}
            <Chip label={post.label} size="small" color="primary" variant="outlined" className={classes.chip} />
          </Typography>
          <hr />
          <Typography variant="h5" color="inherit" paragraph className={classes.content}>
            {post.content}
          </Typography>
        </div>
      </Container>
    </div>
  );
};
