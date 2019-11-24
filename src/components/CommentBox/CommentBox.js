import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

export const CommentBox = () => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <Container>
      <CssBaseline />
      <form>
        <Input
          fullWidth
          type="text"
          multiline
          autoCapitalize
          autoComplete
          placeholder="Write a comment"
          value={comment}
          onChange={handleChange}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
)}
        />
      </form>
    </Container>
  );
};
