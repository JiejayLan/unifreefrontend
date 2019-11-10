import React from 'react';
import { Signup } from '../../components/Signup';
import { CreatePostForm } from '../../components/Forms/CreatePostForm';

export const Home = () => (
  <div>
    <h1>This is home page</h1>
    <Signup />
    <CreatePostForm />
  </div>
);
