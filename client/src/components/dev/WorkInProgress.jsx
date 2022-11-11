import React from 'react';

import { Tooltip } from '@mui/material';
import { ClickAwayListener } from '@mui/material';

const WorkInProgress = (props) => {
  const handleTooltipClose = () => {};

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Work in progress..."
      >
        {props.children}
      </Tooltip>
    </ClickAwayListener>
  );
};

export default WorkInProgress;
