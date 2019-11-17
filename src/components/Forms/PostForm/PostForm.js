import React, { useState } from 'react';
import { func, string, shape } from 'prop-types';
import {
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { ErrorMessage } from '../../ErrorMessage';

export const PostForm = ({
  handleCreate, handleClose, errorMsg, post,
}) => {
  const [formData, setForm] = useState({
    label: post.label,
    title: post.title,
    content: post.content,
  });

  const handleChange = (event) => {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.label || !formData.title || !formData.content) return;
    handleCreate(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      {(!!errorMsg) && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
      <DialogTitle id="form-dialog-title">Create your post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You must filled out all the fields below
        </DialogContentText>
        <TextField
          inputProps={{ 'data-testid': 'label' }}
          margin="dense"
          id="label"
          name="label"
          label="Label"
          type="text"
          onChange={handleChange}
          fullWidth
          required
          autoFocus
          value={formData.label}
        />
        <TextField
          inputProps={{ 'data-testid': 'title' }}
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          onChange={handleChange}
          fullWidth
          required
          value={formData.title}
        />
        <TextField
          inputProps={{ 'data-testid': 'content' }}
          multiline
          margin="dense"
          id="content"
          name="content"
          label="Content"
          type="text"
          onChange={handleChange}
          fullWidth
          required
          value={formData.content}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" data-testid="create-button" color="primary">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

PostForm.defaultProps = {
  post: {
    label: 'general',
    title: '',
    content: '',
  },
};

PostForm.propTypes = {
  handleCreate: func.isRequired,
  handleClose: func.isRequired,
  errorMsg: string.isRequired,
  post: shape({
    label: string,
    title: string,
    content: string,
  }),
};
