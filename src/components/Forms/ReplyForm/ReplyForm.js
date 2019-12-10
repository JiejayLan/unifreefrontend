import React, { useState } from 'react';
import {
  Container, CssBaseline, TextField, Button, Avatar, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { useStyle } from './style';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';

const path = '/api/v1/post/postreply';
const domain = config.apiDomain;
const preparePayload = (method, data) => {
  const token = cookie.load('jwtToken');
  const requestHeaders = { Authorization: token };
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    data,
    headers: requestHeaders,
  };
};

export const ReplyForm = (props) => {
  const classes = useStyle();

  const [content, setContent] = useState('');
  const [replyForm, setReplyForm] = useState(false);
  const { commentID } = props;
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const avatarURL = 'http://api.adorable.io/avatar/50/';

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const openReplyForm = () => {
    setReplyForm(true);
  };
  const closeReplyForm = () => {
    setContent('');
    setReplyForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { commentID, content };
      const payload = preparePayload('post', data);
      const response = await serviceRequest(payload);
      if (response.status && response.status === 'success') {
        setContent('');
        window.location.reload();
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
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      {isError && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
      <Button
        data-testid="showReplyButton"
        className={classes.replyButton}
        onClick={openReplyForm}
      >
        REPLY
      </Button>
      {replyForm && (
        <form onSubmit={handleSubmit}>
          <Grid container wrap="nowrap" className={classes.grid} spacing={1}>
            <Grid item>
              <Avatar
                component="span"
                alt="profile picture"
                className={classes.avatar}
                src={avatarURL + cookie.load('username')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                type="text"
                multiline
                autoComplete="on"
                component="span"
                data-testid="replyInput"
                className={classes.input}
                value={content}
                onChange={handleChange}
                inputProps={{ maxLength: 500 }}
                helperText={`${content.length}/${500}`}
              />
              <Button
                disabled={!content.trim()}
                data-testid="replyButton"
                variant="contained"
                type="submit"
                color="primary"
                className={classes.button}
              >
                REPLY
              </Button>
              <Button
                data-testid="cancelButton"
                color="primary"
                className={classes.button}
                onClick={closeReplyForm}
              >
                CANCEL
              </Button>

            </Grid>
          </Grid>

        </form>
      )}
    </Container>
  );
};

ReplyForm.propTypes = {
  commentID: PropTypes.number.isRequired,
};
