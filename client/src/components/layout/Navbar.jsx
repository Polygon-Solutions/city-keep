import React, { useState } from 'react';

import ReportFormPopover from '../reports/ReportFormPopover';

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

// Custom floating action button
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -28,
  left: 0,
  right: 0,
  margin: '0 auto',
});

/**
 * *
 * Navbar Component
 * @description
    - Renders an app bar with a button for Reports and 
      Settings and a floating action button for adding a 
      new report
    - Renders the ReportFormPopover component when formOpen 
      is set to true
 * @listens Router (but imported into App.jsx)
 */
const Navbar = () => {
  // State
  const [formOpen, setFormOpen] = useState(false);

  // State Handlers
  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => setFormOpen(false);

  // Render
  return (
    <>
      <AppBar
        sx={{
          top: 'auto',
          bottom: 0,
          maxWidth: 'calc(100vh * 0.75)',
          left: 'auto',
          right: 'auto',
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: '56px' }}>
          <IconButton href="/reports" color="inherit">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" onClick={handleFormOpen}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton href="/settings" color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ReportFormPopover
        open={formOpen}
        handleFormClose={handleFormClose}
        distanceFromButton={16}
      />
    </>
  );
};

export default Navbar;
