import React, { useState } from 'react';
import { func, string, shape } from 'prop-types';
import {
  TextField,
  Button,
  Container,
  DialogContent,
  DialogContentText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { ErrorMessage } from '../../ErrorMessage';
import useStyles from './style';

export const PostForm = ({
  handleCreate, handleClose, errorMsg, post,
}) => {
  const classes = useStyles();
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
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {post.title ? 'Edit ' : 'Create '}
            your post
          </Typography>
          <Button color="inherit" type="submit" data-testid="create-button">
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {(!!errorMsg) && <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />}
        <DialogContent>
          <DialogContentText>
            You must filled out all the fields below
          </DialogContentText>
          <TextField
            inputProps={{ 'data-testid': 'label' }}
            margin="normal"
            id="label"
            name="label"
            label="Label"
            type="text"
            onChange={handleChange}
            fullWidth
            required
            autoFocus
            value={formData.label}
            variant="outlined"
          />
          <TextField
            inputProps={{ 'data-testid': 'title' }}
            margin="normal"
            id="title"
            name="title"
            label="Title"
            type="text"
            onChange={handleChange}
            fullWidth
            required
            value={formData.title}
            variant="outlined"
          />
          <TextField
            inputProps={{ 'data-testid': 'content' }}
            multiline
            margin="normal"
            id="content"
            name="content"
            label="Content"
            type="text"
            onChange={handleChange}
            fullWidth
            required
            value={formData.content}
            variant="outlined"
            rowsMax="10"
            rows="10"
          />
        </DialogContent>
      </Container>
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
