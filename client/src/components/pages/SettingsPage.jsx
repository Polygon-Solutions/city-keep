import React, { useState } from 'react';

import {
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const SettingsPage = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = (event) => {
    event.preventDefault();
    console.log('Change Password!');
    //AWS Cognito
  };

  const handleLogout = () => {
    console.log('Logout!');
    //AWS Cognito
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
          fullWidth
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
