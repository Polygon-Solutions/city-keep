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

  // JSX
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
