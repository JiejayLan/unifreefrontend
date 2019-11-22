import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { Dialog } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import config from '../../../config';
import { serviceRequest } from '../../../services/serviceRequest';
import { PostForm } from '../PostForm/PostForm';
import { useStateValue } from '../../StateProvider';
import useStyles from './style';

const path = '/api/v1/user/updatepost';
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

export const EditPostForm = () => {
  const classes = useStyles();
  const [{ post }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [isValidPost, setIsValidPost] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg('');
  };

  const handleCreate = async (formData) => {
    try {
      const requestPayload = preparePayload('put', { postID: post.postID, ...formData });
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        dispatch({
          type: 'changePost',
          newPost: { ...post, ...formData },
        });
        handleClose();
        setIsValidPost(true);
      } else if (response.status && response.status === 'error') {
        setErrorMsg('An Error has occured');
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      setErrorMsg('Internal Service Error');
    }
  };

  return (
    <>
      {isValidPost && <Redirect to={`/viewpost/${post.postID}`} />}
      <Button
        data-testid="edit-post-button"
        variant="contained"
        size="small"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
        className={classes.editBtn}
      >
        Edit
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <PostForm
          handleCreate={handleCreate}
          handleClose={handleClose}
          errorMsg={errorMsg}
          post={{ label: post.label, title: post.title, content: post.content }}
        />
      </Dialog>
    </>
  );
};
