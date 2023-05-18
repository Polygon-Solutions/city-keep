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
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const { currentPassword, newPassword } = formData;

  // State Handler
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Context
  const { changePassword } = useContext(AccountContext);
  const { addAlert } = useContext(AlertsContext);

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
      addAlert('Please enter your current password.', 'warning');
      return;
    }
    if (newPassword === '') {
      addAlert('Please enter a new password.', 'warning');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      addAlert('Password changed successfully.', 'success');
      setFormData({
        currentPassword: '',
        newPassword: '',
      });
    } catch (err) {
      addAlert(err.message, 'error');
    }
  };

  // Render
  return (
    <>
      <Typography variant="h4">Change Password</Typography>
      <Box component="form" onSubmit={handleChangePassword}>
        <SettingsTextField
          mt={1}
          label="Current Password"
          type="password"
          name="currentPassword"
          value={currentPassword}
          handleValueChange={handleFormChange}
        />
        <SettingsTextField
          label="New Password"
          type="password"
          name="newPassword"
          value={newPassword}
          handleValueChange={handleFormChange}
        />
        <SettingsButton
          color="secondary"
          label="Change Password"
          type="submit"
        />
      </Box>
    </>
  );
};

export default ChangePassword;
