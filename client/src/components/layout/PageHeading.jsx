import React, { useContext } from 'react';

import { AppBar } from '@mui/material';

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
