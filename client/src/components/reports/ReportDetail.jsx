import React from 'react';

import { Typography, Grid } from '@mui/material';

const ReportDetail = ({ label, detail }) => {
  return (
    <Grid container columns={32} sx={{ my: 1 }}>
      <Grid item xs={32} sm={9}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
          {label + ': '}
        </Typography>
      </Grid>
      <Grid item xs={32} sm={23}>
        <Typography sx={{ fontSize: '14px' }}>
          {detail}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReportDetail;
