import React from 'react';

import Page from '../layout/Page';
import PageHeading from '../layout/PageHeading';
import ChangePassword from '../auth/ChangePassword';
import Logout from '../auth/Logout';

import { Typography, Box } from '@mui/material';

/**
 * *
 * ReportsPage Component
 * @description
    - Renders the page heading
    - Renders a section heading (h3) for Account Management
    - Renders ChangePassword component
    - Renders Logout component
 * @listens AuthOutlet (but imported into App.jsx)
 */
const SettingsPage = () => {
  // Render
  return (
    <Page pt={1}>
      <PageHeading>
        <Typography variant="h1">Settings</Typography>
      </PageHeading>
      <Box sx={{ width: 0.85, mx: 'auto', mt: 2 }}>
        {/* User Details section goes here - see SettingsPage_archive.js */}
        <Typography variant="h3">Account Management</Typography>
        <ChangePassword />
        <Logout />
      </Box>
    </Page>
  );
};

export default SettingsPage;
