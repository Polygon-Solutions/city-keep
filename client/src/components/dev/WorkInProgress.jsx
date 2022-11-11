import React from 'react';

import { Tooltip, ClickAwayListener, Box } from '@mui/material';

const WorkInProgress = ({
  message,
  placement,
  sx,
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        title={message || 'Work in progress...'}
        placement={placement}
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <Box onClick={handleTooltipOpen} sx={sx}>
          {children}
        </Box>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default WorkInProgress;
