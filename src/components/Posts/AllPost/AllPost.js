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
  const [{ posts, page }, dispatch] = useStateValue();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Authorization Error');

  const token = cookie.load('jwtToken');
  const allPostHeaders = { Authorization: token };
  const subPosts = posts.slice(1);

  useEffect(() => {
    async function fetchAllPosts() {
      const requestPayload = preparePayload('get', allPostHeaders,
        { page: page.currentPage, pageSize: page.pageSize, viewall: true });
      const response = await serviceRequest(requestPayload);
      try {
        if (response.status && response.status === 'success') {
          const { data } = response;
          dispatch({
            type: 'changePosts',
            posts: data.posts,
          });
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
    }
    fetchAllPosts();
    // eslint-disable-next-line
  }, [posts.currentPage]);

  return (
    <>
      {isError ? (<ErrorMessage message={errorMsg} styles={{ color: 'red' }} />)
        : (
          <>
            <CssBaseline />
            <Container maxWidth="lg">
              <main>
                {posts[0] && <MainPost mainPost={posts[0]} />}
                <Grid container spacing={4}>
                  {subPosts.map((post) => (
                    <SubPost post={post} key={post.posterID + post.title} />
                  ))}
                </Grid>
              </main>
            </Container>
          </>
        )}
    </>
  );
};
