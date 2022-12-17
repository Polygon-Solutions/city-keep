import React, { useState, useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';

import Page from '../layout/Page';
import PageHeading from '../layout/PageHeading';
import SettingsButton from '../layout/SettingsButton';
import SettingsTextField from '../layout/SettingsTextField';

import { Typography, Box, Divider } from '@mui/material';

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { changePassword, logout } = useContext(AccountContext);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Page pt={1}>
      <PageHeading>
        <Typography variant="h1">Settings</Typography>
      </PageHeading>
      <Box sx={{ width: 0.85, mx: 'auto', mt: 2 }}>
        <Typography variant="h3">User Details</Typography>
        <Typography variant="dev" sx={{ ml: 2 }}>
          Work in Progress...
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h3">Account Management</Typography>
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
        <Typography variant="h4">Logout</Typography>
        <SettingsButton
          color="error"
          text="Logout"
          type="button"
          handleClick={handleLogout}
        />
      </Box>
    </Page>
  );
};

export default SettingsPage;
