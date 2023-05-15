import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid } from '@mui/material';

/**
 * *
 * ReportDetail Component
 * @description
    - Renders a label and detail for a given report 
      attribute
    - Uses flexbox to display the label and detail 
      consistently inline
 * @param {String} props.label
 * @param {String} props.detail
 * @listens Report
 */
const ReportDetail = ({ label, detail }) => {
  // Render
  return (
    <Grid container columns={32} sx={{ my: 1 }}>
      <Grid item xs={32} sm={9}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
          {`${label}: `}
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

ReportDetail.propTypes = {
  label: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

export default ReportDetail;
