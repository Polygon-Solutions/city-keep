import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

import { Popover, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReportForm from '../reports/ReportForm';

const ReportFormPopover = ({ open, setOpen }) => {
  const { height, width } = useWindowDimensions();
  const distanceFromButton = 16;

  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
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
      transitionDuration={350}
      PaperProps={{
        sx: {
          width: 1,
          height: height - (56 + 28 + distanceFromButton + 16),
          borderRadius: '6px',
          border: `3px solid ${theme.palette.primary.main}`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'stretch',
        },
      }}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <ReportForm />
    </Popover>
  );
};

export default ReportFormPopover;
