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
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Invalid entries');

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
  };

  const validateInput = () => {
    const { label, title, content } = formData;
    const isEmpty = !!label && !!title && !!content;
    if (isEmpty) {
      setIsValid(false);
      setErrorMsg('Empty!');
      return false;
    }
    setIsValid(true);
    return true;
  };

  const handleCreate = async () => {
    try {
      validateInput();
      const requestPayload = preparePayload('post', formData);
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'error') {
        setErrorMsg('Please make sure field is not empty');
      }
    } catch (err) {
      setErrorMsg('Internal Service Error');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create your post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to create your post, you must filled out all the fields below
          </DialogContentText>
          <TextField
            margin="dense"
            id="label"
            name="label"
            label="Label"
            type="text"
            defaultValue="general"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        { isValid && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} /> }
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
