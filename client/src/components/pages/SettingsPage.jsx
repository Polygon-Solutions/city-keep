import React from 'react';

import Page from '../layout/Page';
import PageHeading from '../layout/PageHeading';
import ChangePassword from '../auth/ChangePassword';
import Logout from '../auth/Logout';

import { Typography, Box, Divider } from '@mui/material';

const SettingsPage = () => {
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
        <ChangePassword />
        <Logout />
      </Box>
    </Page>
  );
};

export default SettingsPage;
