import React from 'react';
import cookie from 'react-cookies';
import Typography from '@material-ui/core/Typography';
import { AllPost } from '../../components/Posts/AllPost';

export const Home = () => (
  <div>
    {(cookie.load('jwtToken')) ? <AllPost /> : (<Typography variant="h4" align="center">Please Login</Typography>)}
  </div>
);
