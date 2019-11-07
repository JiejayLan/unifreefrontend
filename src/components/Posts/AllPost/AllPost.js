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
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import cookie from 'react-cookies';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { StateProvider } from '../../StateProvider';
import useStyles from './style';

const path = '/api/v1/user/getposts?viewall=true';
const domain = config.apiDomain;

function preparePayload(method, headers, data) {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers,
    data,
  };
}

export const AllPost = () => {
  const classes = useStyles();

  const token = cookie.load('jwtToken');
  const postData = { viewall: true };
  const postHeaders = { Authorization: token };
  const [allPosts, setAllPosts] = useState({ posts: [] });
  const main = allPosts.posts[0];
  const subPosts = allPosts.posts.slice(1);

  const initialState = {
    page: { currentPage: 1, totalPages: 1 },
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
      const requestPayload = preparePayload('get', postHeaders, postData);
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
  }, [allPosts, postHeaders, postData]);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
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
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {main && main.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {main && main.content}
                  </Typography>
                  <Link variant="subtitle1" href="/">
                    Continue reading…
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={4}>
            {subPosts.map((post) => (
              <Grid item key={post.title + post.createdAt} xs={12} md={6}>
                <CardActionArea component="a" href="#">
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {post.updatedAt.substr(0, post.createdAt.indexOf('T'))}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.content}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          Continue reading...
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
          {/* End sub featured posts */}
        </main>
      </Container>
    </StateProvider>
  );
};
