import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  TextField,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { useStyle } from './style';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';

const path = '/api/v1/post/postcomment';
const domain = config.apiDomain;

const preparePayload = (method, data) => {
  const token = cookie.load('jwtoken');
  const requestHeaders = { Authorization: token };
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    data,
    headers: requestHeaders,
  };
};


export const CommentInput = (props) => {
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const classes = useStyle();
  const { postID } = props;

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content) {
      try {
        const data = { postID, content };
        const payload = preparePayload('post', data);
        const response = await serviceRequest(payload);
        if (response.status && response.status === 'success') {
          setContent('');
        } else if (response.status && response.status === 'error') {
          setIsError(true);
          setErrorMsg(response.message);
        } else {
          throw new Error('Internal Service Error');
        }
      } catch (error) {
        setErrorMsg('Internal Service Error');
        setIsError(true);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      {isError && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          rowsMax={5}
          multiline
          disableUnderline
          autoComplete="on"
          className={classes.input}
          inputProps={{ maxLength: 600 }}
          label="Leave a comment"
          variant="outlined"
          value={content}
          onChange={handleChange}
        />
        {
          content !== ''
          && (
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.button}
            >
              Post
            </Button>
          )
        }
      </form>
    </Container>
  );
};

CommentInput.propTypes = {
  postID: PropTypes.number.isRequired,
};
