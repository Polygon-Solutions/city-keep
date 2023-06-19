import React from 'react';

import {
  Link,
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';

/**
 * *
 * Heading Component
 * @description
    - Renders an app bar with the app title
    - Displays no matter the Route path and only when user 
      is not authenticated
 * @listens Router (but imported into App.jsx)
 */
const Heading = () => {
  // Render
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

export default Heading;
