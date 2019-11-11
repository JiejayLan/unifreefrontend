import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  string,
  number,
  shape,
} from 'prop-types';
import useStyles from './style';

export const MainPost = ({ mainPost }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.mainFeaturedPost}>
      {
        <img
          style={{ display: 'none' }}
          src="https://source.unsplash.com/user/erondu"
          alt="background"
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Chip label={mainPost.label} size="small" color="primary" />
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {mainPost.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {`${mainPost.content.substring(0, 100)}`}
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              {`${mainPost.updatedAt.substr(0, mainPost.updatedAt.indexOf('T'))} 
                by ${mainPost.username}`}
            </Typography>
            <Button
              data-testid="continue-read-button"
              variant="contained"
              color="primary"
              component={Link}
              to={`/viewpost/${mainPost.postID}`}
            >
              Continue Reading...
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

MainPost.propTypes = {
  // eslint-disable-next-line react/require-default-props
  mainPost: shape({
    label: string,
    title: string,
    content: string,
    updatedAt: string,
    createdAt: string,
    postID: number.isRequired,
    username: string,
  }),
};
