import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const { getAuthToken } = require('./helpers/utils');

const AuthenticatedRoute = ({ component: Component, path, name }) => {
  const isLoggedIn = getAuthToken();
  return (
    <Route
      exact
      path={path}
      name={name}
      render={props =>
        (isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        ))
      }
    />
  );
};

export default AuthenticatedRoute;
