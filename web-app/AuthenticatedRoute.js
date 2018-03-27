import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, path, name }) => {
  const isLoggedIn = document.cookie.length !== 0;
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
