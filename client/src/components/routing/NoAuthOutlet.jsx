import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * *
 * NoAuthOutlet Component
 * @description
    - Renders the child routes if the user is not logged in
    - Navigates to the reports page if the user is logged in
 * @prop {boolean} isAuthenticated - authentication status
 * @listens Route (but imported into App.jsx)
 */
export const NoAuthOutlet = ({ isAuthenticated }) => {
  // Render
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/reports" />
  );
};

NoAuthOutlet.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NoAuthOutlet;
