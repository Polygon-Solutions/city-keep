import React, { useState, useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';

import Page from '../layout/Page';
import PageHeading from '../layout/PageHeading';

import {
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { changePassword, logout } = useContext(AccountContext);

  const theme = useTheme();

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
    <Page pt={2}>
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
          <TextField
            size="small"
            variant="standard"
            color="secondary"
            sx={{ display: 'block', width: 0.8, ml: 2 }}
            InputProps={{
              sx: {
                width: 1,
                '&:hover:not(.Mui-disabled)::before': {
                  borderColor: theme.palette.secondary.main,
                },
              },
            }}
            required
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            variant="standard"
            color="secondary"
            sx={{ display: 'block', width: 0.8, ml: 2, my: 2 }}
            InputProps={{
              sx: {
                width: 1,
                '&:hover:not(.Mui-disabled)::before': {
                  borderColor: theme.palette.secondary.main,
                },
              },
            }}
            required
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              display: 'block',
              width: 0.5,
              borderWidth: 3,
              ml: 2,
              mt: 2,
              mb: 4,
              '&:hover': {
                borderWidth: 3,
              },
            }}
            type="submit"
          >
            Change Password
          </Button>
        </Box>
        <Typography variant="h4">Logout</Typography>
        <Button
          color="error"
          variant="outlined"
          size="small"
          sx={{
            display: 'block',
            width: 0.5,
            borderWidth: 3,
            ml: 2,
            mt: 2,
            mb: 4,
            '&:hover': {
              borderWidth: 3,
            },
          }}
          type="button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Page>
  );
};

export default SettingsPage;
