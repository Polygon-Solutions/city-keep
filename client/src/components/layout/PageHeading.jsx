import { AppBar } from '@mui/material';
import React from 'react';

const PageHeading = ({ children }) => {
  return (
    <AppBar sx={{ backgroundColor: 'neutral.main', p: 2 }}>
      {children}
    </AppBar>
  );
};

export default PageHeading;
