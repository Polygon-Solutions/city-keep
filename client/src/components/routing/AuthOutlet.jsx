import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * *
 * AuthOutlet Component
 * @description
    - Renders the child routes if the user is logged in
    - Navigates to the home page if the user is not logged in
 * @prop {boolean} isAuthenticated - authentication status
 * @listens Route (but imported into App.jsx)
 */
export const AuthOutlet = ({ isAuthenticated }) => {
  // Render
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

AuthOutlet.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AuthOutlet;
