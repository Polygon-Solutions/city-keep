import React from 'react';

import WorkInProgress from '../dev/WorkInProgress';

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
  top: -28,
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
        <WorkInProgress placement="top" offset={[24, 12]}>
          <IconButton href="/reports" color="inherit">
            <MenuIcon />
          </IconButton>
        </WorkInProgress>
        <WorkInProgress placement="top">
          <StyledFab color="secondary">
            <AddIcon />
          </StyledFab>
        </WorkInProgress>
        <Box sx={{ flexGrow: 1 }} />
        <WorkInProgress placement="top" offset={[-24, 12]}>
          <IconButton href="/settings" color="inherit">
            <SettingsIcon />
          </IconButton>
        </WorkInProgress>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
