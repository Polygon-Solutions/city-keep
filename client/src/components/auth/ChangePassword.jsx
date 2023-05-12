import React, { useState, useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import SettingsButton from '../layout/SettingsButton';
import SettingsTextField from '../layout/SettingsTextField';

import { Typography, Box } from '@mui/material';

/**
 * *
 * ChangePassword Component
 * @description
    - Renders two text fields that allow the user to enter their current and new password.
    - Renders a button that triggers the changePassword function
 * @listens SettingsPage
 * @fires AccountContext.changePassword
 */
const ChangePassword = () => {
  // State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Context
  const { changePassword } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  /** 
   * *
   * Handle Password Change
   * @description 
      - Checks password fields are not empty
      - Checks if passwords are valid
      - If valid, awaits changePassword function
      - If not valid, displays warning messages
      - If error from backend, displays error message
   * @listens Box (form) submission
   * @fires AccountContext.changePassword
   */
  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (currentPassword === '') {
      setAlert('Please enter your current password.', 'warning');
      return;
    }
    if (newPassword === '') {
      setAlert('Please enter a new password.', 'warning');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setAlert('Password changed successfully.', 'success');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setAlert(err.message, 'error');
    }
  };

  //JSX
  return (
    <>
      <Typography variant="h4">Change Password</Typography>
      <Box component="form" onSubmit={handleChangePassword}>
        <SettingsTextField
          mt={1}
          label="Current Password"
          type="password"
          value={currentPassword}
          setValue={setCurrentPassword}
        />
        <SettingsTextField
          label="New Password"
          type="password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <SettingsButton
          color="secondary"
          text="Change Password"
          type="submit"
        />
      </Box>
    </>
  );
};

export default ChangePassword;
