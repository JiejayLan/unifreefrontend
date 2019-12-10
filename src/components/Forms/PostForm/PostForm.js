import React, { useState } from 'react';
import {
  func, string, shape, bool,
} from 'prop-types';
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
  handleCreate, handleClose, errorMsg, post, editingPost,
}) => {
  const LABEL_CHAR_LIMIT = 30;
  const TITLE_CHAR_LIMIT = 50;
  const CONTENT_CHAR_LIMIT = 2000;

  const classes = useStyles();
  const [formData, setForm] = useState({
    label: editingPost ? post.label : '',
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
    if (!formData.title.trim() || !formData.content.trim()) {
      setForm({ label: '', title: '', content: '' });
      return;
    }
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
            inputProps={{ 'data-testid': 'label', maxLength: LABEL_CHAR_LIMIT }}
            margin="normal"
            id="label"
            name="label"
            label="Label (optional)"
            type="text"
            onChange={handleChange}
            fullWidth
            autoFocus
            value={formData.label}
            variant="outlined"
            helperText={`${formData.label.length}/${LABEL_CHAR_LIMIT}`}
          />
          <TextField
            inputProps={{ 'data-testid': 'title', maxLength: TITLE_CHAR_LIMIT }}
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
            helperText={`${formData.title.length}/${TITLE_CHAR_LIMIT}`}
          />
          <TextField
            inputProps={{ 'data-testid': 'content', maxLength: CONTENT_CHAR_LIMIT }}
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
            helperText={`${formData.content.length}/${CONTENT_CHAR_LIMIT}`}
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
  editingPost: false,
};

PostForm.propTypes = {
  handleCreate: func.isRequired,
  handleClose: func.isRequired,
  errorMsg: string.isRequired,
  editingPost: bool,
  post: shape({
    label: string,
    title: string,
    content: string,
  }),
};
