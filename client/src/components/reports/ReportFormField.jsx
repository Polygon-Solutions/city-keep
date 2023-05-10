import React from 'react';

import { TextField } from '@mui/material';

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
