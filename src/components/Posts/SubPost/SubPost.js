import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  string,
  number,
  shape,
} from 'prop-types';
import useStyles from './style';
import { Label } from '../../Label';

export const SubPost = ({ post }) => {
  const classes = useStyles();

  return (
    <Grid item key={post.postID} xs={12} md={6}>
      <CardActionArea component={Link} to={`/viewpost/${post.postID}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Label label={post.label} style={classes.label} />
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {`${post.content.substring(0, 40)}...`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`${post.updatedAt
                  ? post.updatedAt.substr(0, post.updatedAt.indexOf('T'))
                  : post.createdAt.substr(0, post.createdAt.indexOf('T'))} by ${post.username}`}
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/random"
              title="Image title"
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

SubPost.propTypes = {
  post: shape({
    label: string,
    title: string,
    content: string,
    updatedAt: string,
    createdAt: string,
    postID: number.isRequired,
    username: string,
  }).isRequired,
};
