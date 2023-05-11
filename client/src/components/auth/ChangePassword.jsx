import React, { useState, useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import SettingsButton from '../layout/SettingsButton';
import SettingsTextField from '../layout/SettingsTextField';

import { Typography, Box } from '@mui/material';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { changePassword } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

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

  return (
    <>
      <Typography variant="h4">Change Password</Typography>
      <Box component="form" onSubmit={handleChangePassword}>
        <SettingsTextField
          label="Current Password"
          color="secondary"
          mt={1}
          type="password"
          value={currentPassword}
          setValue={setCurrentPassword}
        />
        <SettingsTextField
          label="New Password"
          color="secondary"
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
