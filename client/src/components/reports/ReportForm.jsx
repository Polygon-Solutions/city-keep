import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

import {
  Box,
  Popover,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReportForm = ({ anchorEl, setAnchorEl }) => {
  const { height, width } = useWindowDimensions();
  const distanceFromButton = 16;

  const theme = useTheme();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSubmit = () => {
    console.log('Submit!');
  };

  return (
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={{
        left: width / 2,
        top: height - (56 + 28 + distanceFromButton),
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          width: 1,
          height: height - (56 + 28 + distanceFromButton + 16),
          borderRadius: '6px',
          border: `3px solid ${theme.palette.primary.main}`,
          boxSizing: 'border-box',
        },
      }}
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
