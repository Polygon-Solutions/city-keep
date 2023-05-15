import React from 'react';

import { TextField } from '@mui/material';

/**
 * *
 * ReportFormField Component
 * @description
    - Renders a styled TextField component for use in the 
      report form
 * @listens ReportForm
 */
const ReportFormField = (props) => {
  return (
    <TextField
      required
      fullWidth
      size="small"
      margin="dense"
      {...props}
    />
  );
};

export default ReportFormField;
