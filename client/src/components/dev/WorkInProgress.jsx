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
 * @param {String} message - message to display in the tooltip
 * @param {String} placement - placement of the tooltip
 * @param {Number} offset - tooltip offset from the target
 * @param {Object} children - child component to wrap
 * @listens ForgotPassword,SignIn,ImageUpload (12-05-2023)
 */
const WorkInProgress = ({
  message = 'Work in progress...',
  placement,
  offset,
  children,
}) => {
  // State
  const [open, setOpen] = useState(false);

  // Render
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
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
                offset,
              },
            },
          ],
        }}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(true)}
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

WorkInProgress.propTypes = {
  message: PropTypes.string,
  placement: PropTypes.string,
  offset: PropTypes.number,
  children: PropTypes.node,
};

export default WorkInProgress;
