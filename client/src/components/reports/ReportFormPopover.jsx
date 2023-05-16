import React from 'react';
import PropTypes from 'prop-types';

import useWindowDimensions from '../../utils/useWindowDimensions';

import { Popover, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReportForm from './ReportForm';

/**
 * *
 * ReportFormPopover Component
 * @description
    - Renders a Popover component that holds the ReportForm 
      component.
    - The size of the popover is set using calc() with vh 
      and svh
    - The position of the popover is set using the 
      useWindowDimensions() hook
    - Is controlled by the `open` prop
 * @prop {boolean} props.open
 * @prop {Function} props.handleFormOpen
 * @prop {number} props.distanceFromButton
 * @listens Navbar
 * @fires setOpen
 */
const ReportFormPopover = ({
  open,
  handleFormOpen,
  distanceFromButton,
}) => {
  // Hooks
  const { height, width } = useWindowDimensions();

  // Theme
  const theme = useTheme();

  // Render
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
      onClose={handleFormOpen(false)}
    >
      <ReportForm />
    </Popover>
  );
};

// PropTypes
ReportFormPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  distanceFromButton: PropTypes.number.isRequired,
};

export default ReportFormPopover;
