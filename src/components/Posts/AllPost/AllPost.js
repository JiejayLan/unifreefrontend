import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import cookie from 'react-cookies';
import { serviceRequest } from '../../../services/serviceRequest';
import config from '../../../config';
import { StateProvider } from '../../StateProvider';
import { ErrorMessage } from '../../ErrorMessage';
import { MainPost } from '../MainPost';
import { SubPost } from '../SubPost';

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
  const [allPostParams] = useState({ page: 1, pageSize: 15, viewall: true });
  const token = cookie.load('jwtToken');
  const allPostHeaders = { Authorization: token };
  const [allPosts, setAllPosts] = useState({ posts: [] });
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Authorization Error');

  const mainPost = allPosts.posts[0];
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
  }, [initialState.page.offset, initialState.page.limit, allPostHeaders, allPostParams]);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {isError ? (<ErrorMessage message={errorMsg} styles={{ color: 'red' }} />)
        : (
          <>
            <CssBaseline />
            <Container maxWidth="lg">
              <main>
                <MainPost mainPost={mainPost} />
                <Grid container spacing={4}>
                  {subPosts.map((post) => (
                    <SubPost post={post} />
                  ))}
                </Grid>
              </main>
            </Container>
          </>
        )}
    </StateProvider>
  );
};
