import React, { useState } from 'react';

import { Tooltip, ClickAwayListener } from '@mui/material';

const WorkInProgress = ({
  message,
  placement,
  sx,
  children,
}) => {
  const [open, setOpen] = useState(false);

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
        onClick={handleTooltipOpen}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        sx={sx}
      >
        {children}
      </Tooltip>
    </ClickAwayListener>
  );
};

export default WorkInProgress;
