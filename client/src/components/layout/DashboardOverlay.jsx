import React, { useState } from 'react';

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
import ReportForm from './ReportFormPopover';

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

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: 'auto', bottom: 0 }}
      >
        <Toolbar variant="dense" sx={{ minHeight: '56px' }}>
          <WorkInProgress placement="top" offset={[24, 12]}>
            <IconButton href="/reports" color="inherit">
              <MenuIcon />
            </IconButton>
          </WorkInProgress>
          <WorkInProgress placement="top">
            <StyledFab
              color="secondary"
              onClick={() => setFormOpen(true)}
            >
              <AddIcon />
            </StyledFab>
          </WorkInProgress>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton href="/settings" color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ReportForm open={formOpen} setOpen={setFormOpen} />
    </>
  );
};

export default DashboardOverlay;
