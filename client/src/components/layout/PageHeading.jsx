import React, { useContext } from 'react';

import DisplayContext from '../../context/display/DisplayContext';

import { AppBar } from '@mui/material';

const PageHeading = ({ children }) => {
  const { windowHeight } = useContext(DisplayContext);

  return (
    <AppBar
      sx={{
        backgroundColor: 'neutral.main',
        p: 2,
        maxWidth: windowHeight * 0.75,
        right: 'auto',
      }}
    >
      {children}
    </AppBar>
  );
};

export default PageHeading;
