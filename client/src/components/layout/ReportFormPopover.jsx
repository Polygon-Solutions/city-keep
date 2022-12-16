import React, { useContext } from 'react';

import DisplayContext from '../../context/display/DisplayContext';

import { Popover, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReportForm from '../reports/ReportForm';

const ReportFormPopover = ({ open, setOpen }) => {
  const { windowHeight, windowWidth } =
    useContext(DisplayContext);
  const distanceFromButton = 16;

  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={{
        left: windowWidth / 2,
        top: windowHeight - (56 + 28 + distanceFromButton),
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Zoom}
      transitionDuration={350}
      PaperProps={{
        sx: {
          width: 'calc(100% - 32px)',
          maxWidth: windowHeight * 0.75 - 32,
          height:
            windowHeight - (56 + 28 + distanceFromButton + 16),
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
