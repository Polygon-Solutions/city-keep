import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tooltip, ClickAwayListener } from '@mui/material';

/**
 * *
 * WorkInProgress Component
 * @description
    - Wraps child component that renders a Tooltip 
      component when the child component is clicked
    - Includes a clickAwayListener to close the tooltip 
      when the user clicks outside of it
 * @prop {string} message - message to display in the tooltip
 * @prop {string} placement - placement of the tooltip
 * @prop {number} distance - tooltip distance from the target
 * @prop {React.ReactNode} children
 * @listens ForgotPassword
 * @listens SignIn
 * @listens ImageUpload
 */
const WorkInProgress = ({
  message = 'Work in progress...',
  placement,
  distance,
  children,
}) => {
  // State
  const [open, setOpen] = useState(false);
  const handleTooltipOpen = () => setOpen(true);
  const handleTooltipClose = () => setOpen(false);

  // Render
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        title={message}
        placement={placement}
        arrow
        PopperProps={{
          disablePortal: true,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, distance || 0],
              },
            },
          ], // Popper.js modifiers [skid, dist]
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

// PropTypes
WorkInProgress.propTypes = {
  message: PropTypes.string,
  placement: PropTypes.string,
  distance: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default WorkInProgress;
