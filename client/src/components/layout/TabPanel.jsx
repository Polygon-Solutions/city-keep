import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

/**
 * *
 * TabPanel Component
 * @description
    - Displays one of its children components according to 
      the value prop
 * @param {Number} props.value
 * @param {React.ReactNode} props.children
 * @listens LandingPage
 */
const TabPanel = ({ value, children, other }) => {
  // Render
  return (
    <div role="tabpanel" {...other}>
      <Box sx={{ p: 3 }}>{children[value]}</Box>
    </div>
  );
};

// Prop types
TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default TabPanel;
