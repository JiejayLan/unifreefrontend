import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import {
  string,
  number,
  shape,
} from 'prop-types';
import useStyles from './style';

export const SubPost = ({ post }) => {
  const classes = useStyles();

  return (
    <Grid item key={post.postID} xs={12} md={6}>
      <CardActionArea component={Link} to={`/viewpost/${post.postID}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Chip label={post.label} size="small" color="primary" />
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {`${post.content.substring(0, 95)}...`}
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
