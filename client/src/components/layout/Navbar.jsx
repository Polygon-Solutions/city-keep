import React from 'react';

import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Fab,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: 'auto', bottom: 0 }}
    >
      <Toolbar>
        <IconButton href="/reports" color="inherit">
          <MenuIcon />
        </IconButton>
        <StyledFab color="secondary">
          <AddIcon />
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton href="/settings" color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
