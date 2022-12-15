import React, { useState, useContext } from 'react';

import DisplayContext from '../../context/display/DisplayContext';

import ReportFormPopover from './ReportFormPopover';

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

const DashboardOverlay = () => {
  const [formOpen, setFormOpen] = useState(false);

  const { windowHeight } = useContext(DisplayContext);

  return (
    <>
      <AppBar
        sx={{
          top: 'auto',
          bottom: 0,
          maxWidth: windowHeight * 0.75,
          left: 'auto',
          right: 'auto',
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: '56px' }}>
          <IconButton href="/reports" color="inherit">
            <MenuIcon />
          </IconButton>
          <StyledFab
            color="secondary"
            onClick={() => setFormOpen(true)}
          >
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton href="/settings" color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ReportFormPopover open={formOpen} setOpen={setFormOpen} />
    </>
  );
};

export default DashboardOverlay;
