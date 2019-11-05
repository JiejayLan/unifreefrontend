import React from 'react';
import { Signup } from '../../components/Signup';
import { AllPost } from '../../components/Posts/AllPost';

export const Home = () => (
  <div>
    <AllPost />
    <Signup />
  </div>
);
