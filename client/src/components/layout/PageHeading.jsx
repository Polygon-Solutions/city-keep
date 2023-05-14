import React from 'react';

import { AppBar } from '@mui/material';

/**
 * *
 * PageHeading Component
 * @description
    - Renders an app bar with the heading 1 text
 * @param {Object} props.children - child component(s) to wrap
 * @listens ReportsPage,SettingsPage
 */
const PageHeading = ({ children }) => {
  return (
    <AppBar
      sx={{
        backgroundColor: 'neutral.main',
        p: 2,
        maxWidth: 'calc(100vh *0.75)',
        right: 'auto',
      }}
    >
      {children}
    </AppBar>
  );
};

export default PageHeading;
