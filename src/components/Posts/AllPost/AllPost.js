import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import cookie from 'react-cookies';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { ErrorMessage } from '../../ErrorMessage';
import { MainPost } from '../MainPost';
import { SubPost } from '../SubPost';
import { useStateValue } from '../../StateProvider';
import { Pagination } from '../../Pagination';
import useStyles from './style';

const path = '/api/v1/user/getposts?';
const domain = config.apiDomain;

const preparePayload = (method, headers, params) => {
  const url = `https://${domain}${path}`;
  return {
    method,
    url,
    headers,
    params,
  };
};

export const AllPost = () => {
  const classes = useStyles();
  const [{ posts, page }, dispatch] = useStateValue();
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Authorization Error');
  const token = cookie.load('jwtToken');
  const subPosts = posts.slice(1);
  const requestHeader = { Authorization: token };

  const handleSuccessData = (data) => {
    const { posts: newPosts, totalPages } = data;
    setIsLoad(true);
    dispatch({
      type: 'changePosts',
      newPosts,
    });
    dispatch({
      type: 'changePage',
      newPage: { totalPages },
    });
  };

  const fetchAllPosts = async () => {
    try {
      const requestPayload = preparePayload('get', requestHeader,
        { page: page.currentPage, pageSize: page.pageSize, viewall: true });
      const response = await serviceRequest(requestPayload);
      if (response.status && response.status === 'success') {
        const { data } = response;
        handleSuccessData(data);
      } else if (response.status && response.status === 'error') {
        setErrorMsg('Authorization Error');
        setIsError(true);
      } else {
        throw new Error('Internal Service Error');
      }
    } catch (err) {
      setErrorMsg('Internal Service Error');
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line
  }, [page.currentPage, page.pageSize]);

  if (isError) {
    return <ErrorMessage message={errorMsg} styles={{ color: 'red' }} />;
  }

  if (!isLoad) {
    return (
      <div className={classes.loader}>
        <img className={classes.loaderImg} src="/images/loader.gif" alt="loading" />
      </div>
    );
  }

  return (
    <>
      <>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            {posts[0] && <MainPost mainPost={posts[0]} />}
            <Grid container spacing={4}>
              {subPosts.map((post) => (
                <SubPost post={post} key={post.postID + post.title} />
              ))}
            </Grid>
            <Pagination />
          </main>
        </Container>
      </>
      )
    </>
  );
};
