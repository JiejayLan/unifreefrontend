import React, { useState } from 'react';
import cookie from 'react-cookies';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Delete as DeleteIcon } from '@material-ui/icons';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';

const path = '/api/v1/post/deletecomment';
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

export const DeleteComment = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { commentID } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('______close______');
    setOpen(false);
    setErrorMsg('');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const requestPayload = preparePayload('delete', { commentID });
      console.log('______close______');
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        handleClose();
        window.location.reload(true);
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
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        size="small"
        className={classes.deleteBtn}
      />
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
            Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} id="No">
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

DeleteComment.propTypes = {
  commentID: PropTypes.number.isRequired,
};
