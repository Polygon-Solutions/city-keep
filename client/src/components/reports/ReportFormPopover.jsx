import React from 'react';

import useWindowDimensions from '../../utils/useWindowDimensions';

import { Popover, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReportForm from './ReportForm';

const ReportFormPopover = ({
  open,
  setOpen,
  distanceFromButton,
}) => {
  const { height, width } = useWindowDimensions();

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
          width: 'calc(100% - 32px)',
          maxWidth: 'calc(100vh * 0.75 - 32px)', // temporary until there exists a desktop version of this app, this maxWidth value is used in many other components
          height: `calc(100svh - 56px - 28px - ${distanceFromButton}px - 16px)`, // intentional feature, meant to remain after development of desktop version
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
