import React from 'react';

import { Typography, Grid } from '@mui/material';

const ReportDetail = ({ label, detail }) => {
  return (
    <Grid container sx={{ my: 1 }}>
      <Grid item xs={12} sm={3}>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '14px' }}
        >
          {label + ': '}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography sx={{ fontSize: '14px' }}>
          {detail}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReportDetail;
