import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';

const path = '/api/v1/user/createpost';
const domain = config.apiDomain;

function preparePayload(method, data) {
  const token = cookie.load('jwtToken');
  const requestHeader = { Authorization: token };
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers: requestHeader,
    data,
  };
}

export const CreatePostForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setForm] = useState({ label: 'general', title: null, content: null });
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Please make sure all fields are complete');

  const handleChange = (event) => {
    const updateForm = { ...formData };
    updateForm[event.target.name] = event.target.value;
    setForm(updateForm);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg('');
  };

  const handleCreate = async () => {
    if (!formData.label || !formData.title || !formData.content) {
      setErrorMsg('Please make sure all fields are complete');
      setIsError(true);
      return;
    }
    try {
      const requestPayload = preparePayload('post', formData);
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        handleClose();
        window.location.reload();
      } else if (response.status && response.status === 'error') {
        setErrorMsg('Authentication Error');
        setIsError(true);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      setErrorMsg('Internal Service Error');
      setIsError(true);
    }
  };

  return (
    <div>
      <Button data-testid="create-post-button" variant="outlined" color="inherit" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create your post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to create your post, you must filled out all the fields below
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
        {(isError) && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button data-testid="create-button" onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
