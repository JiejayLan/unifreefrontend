import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Input,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyle } from './style';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';

const path = '/api/v1/post/postcomment';
const domain = config.apiDomain;

const preparePayload = (method, data) => {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    data,
  };
};


export const CommentBox = (props) => {
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const classes = useStyle();
  const { postID, commenterID } = props;

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content) {
      try {
        const data = { postID, commenterID, content };
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
    <Container>
      <CssBaseline />
      {isError && <ErrorMessage message={errorMsg} />}
      <form onSubmit={handleSubmit}>
        <Input
          fullWidth
          type="text"
          className={classes.input}
          multiline
          autoCapitalize
          autoComplete
          placeholder="Write a comment"
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

CommentBox.propTypes = {
  postID: PropTypes.number.isRequired,
  commenterID: PropTypes.number.isRequired,
};
