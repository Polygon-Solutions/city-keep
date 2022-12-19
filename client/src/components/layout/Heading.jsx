import React from 'react';

import {
  Link,
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';

const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ minHeight: '64px', px: '24px' }}>
          <Link href="/">
            <Typography variant="title">CityKeep</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
