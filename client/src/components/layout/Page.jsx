import { Box } from '@mui/material';
import React from 'react';

const Page = ({ pt, children }) => {
  return (
    <Box
      sx={{ pt: `${80 + pt * 8}px`, pb: `${56 + 28 + 10}px` }}
    >
      {children}
    </Box>
  );
};

export default Page;
