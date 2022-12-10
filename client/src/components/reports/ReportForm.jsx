import React from 'react';

import {
  Box,
  Popover,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';

const ReportForm = ({ anchorEl, setAnchorEl }) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSubmit = () => {
    console.log('Submit!');
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Zoom}
      PaperProps={{ sx: { width: 1 } }}
      open={open}
      onClose={handleClose}
    >
      <Box
        component="form"
        sx={{ p: 3 }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h2" sx={{ p: 0, mb: 2 }}>
          Submit a Report
        </Typography>
        <TextField />
      </Box>
    </Popover>
  );
};

export default ReportForm;
