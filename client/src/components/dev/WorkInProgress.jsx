import React, { useState } from 'react';

import { Tooltip, ClickAwayListener } from '@mui/material';

const WorkInProgress = ({
  message,
  placement,
  offset,
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
          modifiers: [
            {
              name: 'offset',
              options: {
                offset,
              },
            },
          ],
        }}
        onClose={handleTooltipClose}
        onClick={handleTooltipOpen}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        {children}
      </Tooltip>
    </ClickAwayListener>
  );
};

export default WorkInProgress;
