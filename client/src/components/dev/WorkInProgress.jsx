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
 * @param {String} props.message - message to display in the tooltip
 * @param {String} props.placement - placement of the tooltip
 * @param {Number} props.distance - tooltip distance from the target
 * @param {React.ReactNode} props.children - child component(s) to wrap
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

  const handleOpen = (bool) => {
    setOpen(bool);
  };

  // Render
  return (
    <ClickAwayListener onClickAway={handleOpen(false)}>
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
        onClose={handleOpen(false)}
        onClick={handleOpen(true)}
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
