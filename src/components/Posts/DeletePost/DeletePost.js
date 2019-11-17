import React, { useState } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';
import { useStateValue } from '../../StateProvider';

const path = '/api/v1/user/deletepost';
const domain = config.apiDomain;

const preparePayload = (method, data) => {
  const token = cookie.load('jwtToken');
  const requestHeader = { Authorization: token };
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers: requestHeader,
    data,
  };
};

export const DeletePost = () => {
  const classes = useStyles();
  const [{ post }] = useStateValue();
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg('');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const requestPayload = preparePayload('put', { postID: post.postID });
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        handleClose();
        setIsDelete(true);
      } else if (response.status && response.status === 'error') {
        setErrorMsg('Authentication Error');
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      setErrorMsg('Internal Service Error');
    }
  };

  return (
    <>
      {isDelete && <Redirect to="/" />}
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        size="small"
        className={classes.deleteBtn}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          {(!!errorMsg) && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
          <DialogContentText>
            Are you sure you want to delete this post? You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            No
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
