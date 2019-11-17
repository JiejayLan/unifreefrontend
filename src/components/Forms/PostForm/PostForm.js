import React from 'react';
import { func, string } from 'prop-types';
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
  handleChange, handleCreate, handleClose, errorMsg,
}) => (

  <form onSubmit={handleCreate}>
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
        defaultValue="general"
        onChange={handleChange}
        fullWidth
        required
        autoFocus
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

PostForm.propTypes = {
  handleChange: func.isRequired,
  handleCreate: func.isRequired,
  handleClose: func.isRequired,
  errorMsg: string.isRequired,
};
