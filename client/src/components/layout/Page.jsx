import { Box } from '@mui/material';
import React from 'react';

const Page = ({ children }) => {
  return <Box sx={{ mb: `${56 + 28 + 10}px` }}>{children}</Box>;
};

export default Page;
