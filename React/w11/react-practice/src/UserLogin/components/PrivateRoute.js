import React from 'react';
import { Route, Link, useLocation } from 'react-router-dom';

function PrivateRoute({ children: Component, ...rest }) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={(componentProps) => {
        const isLoggedIn = !!location.state.user;
        return isLoggedIn ? ( // if user is logged in then render the component passed in
          Component
        ) : (
          // if user is not logged in then redirect to login page

          <Route path="/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
