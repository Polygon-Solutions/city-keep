import React, { useState, useContext } from 'react';

import AccountContext from '../../context/user/AccountContext';

import {
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const SettingsPage = ({ setAuth }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { getSession, logout } = useContext(AccountContext);

  const handleChangePassword = (event) => {
    event.preventDefault();
    console.log('Change Password!');

    getSession().then(({ user }) => {
      user.changePassword(
        currentPassword,
        newPassword,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        }
      );
    });

    setCurrentPassword('');
    setNewPassword('');
  };

  const handleLogout = () => {
    console.log('Logged out.');
    logout();
    setAuth(false);
  };

  return (
    <div>
      <Typography variant="h1">Settings</Typography>
      <Box sx={{ width: 0.85, mx: 'auto', mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          User Details
        </Typography>
        <Typography>Work in Progress...</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" sx={{ mb: 1 }}>
          Account Management
        </Typography>
        <Typography>Change Password</Typography>
        <Box
          component="form"
          sx={{ mb: 3 }}
          onSubmit={handleChangePassword}
        >
          <TextField
            fullWidth
            size="small"
            margin="dense"
            color="secondary"
            required
            id="current-password"
            label="Current Password"
            name="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            color="secondary"
            required
            id="new-password"
            label="New Password"
            name="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              width: 0.5,
              mt: 1,
              borderWidth: 3,
              '&:hover': {
                borderWidth: 3,
              },
            }}
            type="submit"
          >
            Change Password
          </Button>
        </Box>
        <Typography sx={{ mb: 1 }}>Logout</Typography>
        <Button
          color="danger"
          variant="outlined"
          size="small"
          sx={{
            width: 0.5,
            borderWidth: 3,
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
    </div>
  );
};

export default SettingsPage;
