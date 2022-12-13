import React from 'react';

import Reports from '../reports/Reports';

import { Typography } from '@mui/material';
import Page from '../layout/Page';

const ReportsPage = () => {
  return (
    <Page>
      <Typography variant="h1">Reports</Typography>
      <Reports />
    </Page>
  );
};

export default ReportsPage;
