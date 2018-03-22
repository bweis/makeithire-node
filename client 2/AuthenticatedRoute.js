import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = document.cookie.length !== 0;
  return (
    <Route
      {...rest}
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
