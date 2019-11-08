import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { StateProvider } from '../../StateProvider';
import useStyles from './style';

const path = '/api/v1/user/getposts?';
const domain = config.apiDomain;

function preparePayload(method, headers, params) {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers,
    params,
  };
}

export const AllPost = () => {
  const classes = useStyles();
  const allPostParams = { page: 1, pageSize: 5, viewall: true };
  const token = cookie.load('jwtToken');
  const allPostHeaders = { Authorization: token };
  const [allPosts, setAllPosts] = useState({ posts: [] });
  const main = allPosts.posts[0];
  const subPosts = allPosts.posts.slice(1);

  const initialState = {
    page: { offset: 0, limit: 1 },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changePage':
        return {
          ...state,
          page: action.newPage,
        };

      default:
        return state;
    }
  };

  useEffect(() => {
    async function fetchAllPosts() {
      const requestPayload = preparePayload('get', allPostHeaders, allPostParams);
      const response = await serviceRequest(requestPayload);
      try {
        if (response.status && response.status === 'success') {
          setAllPosts(response.data);
        } else if (response.status && response.status === 'error') {
          throw new Error('Authorization Error');
        } else {
          throw new Error('Internal Service Error');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
    fetchAllPosts();
  }, [initialState.page.offset, initialState.page.limit, allPostHeaders, allPostParams]);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
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
                  <Chip label={main && main.label} size="small" color="primary" />
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {main && main.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {main && `${main.content.substring(0, 100)}`}
                  </Typography>
                  <Typography variant="subtitle1" color="inherit" gutterBottom>
                    {main && `${main.updatedAt
                      ? main.updatedAt.substr(0, main.updatedAt.indexOf('T'))
                      : main.createdAt.substr(0, main.createdAt.indexOf('T'))} by ${main && main.username}`}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={main && `/viewpost/${main.postID}`}
                  >
                    Continue Reading...
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={4}>
            {subPosts.map((post) => (
              <Grid item key={post.title + post.createdAt} xs={12} md={6}>
                <CardActionArea component={Link} to={`/viewpost/${post.postID}`}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Chip label={post.label} size="small" color="primary" />
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {`${post.content.substring(0, 100)}...`}
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
            ))}
          </Grid>
        </main>
      </Container>
    </StateProvider>
  );
};
