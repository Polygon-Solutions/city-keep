import { Box } from '@mui/material';
import React from 'react';

const Page = ({ mt, children }) => {
  return (
    <Box
      sx={{ mt: `${80 + mt * 8}px`, mb: `${56 + 28 + 10}px` }}
    >
      {children}
    </Box>
  );
};

export default Page;
