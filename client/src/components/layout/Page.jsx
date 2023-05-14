import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

/**
 * *
 * Page Component
 * @description
    - Renders a Box component for positioning the page
    - Uses pt to specify the top padding (if authenticated)
 * @param {Number} props.pt - Custom top padding (=80+pt*8 pixels)
 * @param {React.ReactNode} props.children - child component(s) to wrap
 * @listens ReportsPage
 * @listens SettingsPage
 */
const Page = ({ pt = 0, children }) => {
  // Render
  return (
    <Box
      sx={{ pt: `${80 + pt * 8}px`, pb: `${56 + 28 + 10}px` }}
    >
      {children}
    </Box>
  );
};

// PropTypes
Page.propTypes = {
  pt: PropTypes.number,
  children: PropTypes.node,
};

export default Page;
