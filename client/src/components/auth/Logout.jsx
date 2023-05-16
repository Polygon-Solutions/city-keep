import React, { useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';

import SettingsButton from '../layout/SettingsButton';

import { Typography } from '@mui/material';

/**
 * *
 * Logout Component
 * @description
    - Renders a button that triggers the logout function
 * TODO: Add confirmation dialog
 * @listens SettingsPage
 * @fires AccountContext.logout
 */
const Logout = () => {
  // Context
  const { logout } = useContext(AccountContext);

  /** 
   * *
   * Handle Logout
   * @description 
      - Runs the logout function
   * TODO: Add confirmation dialog
   * @listens SettingsButton
   * @fires AccountContext.logout
   */
  const handleLogout = () => {
    logout();
  };

  // Render
  return (
    <>
      <Typography variant="h4">Logout</Typography>
      <SettingsButton
        color="error"
        label="Logout"
        type="button"
        handleClick={handleLogout}
      />
    </>
  );
};

export default Logout;
