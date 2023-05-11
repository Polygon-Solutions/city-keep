import React from 'react';

import { TextField } from '@mui/material';

const SettingsTextField = ({
  label,
  color = 'secondary',
  mt,
  type,
  value,
  setValue,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="standard"
      color={color}
      sx={{
        display: 'block',
        width: 0.8,
        ml: 2,
        mt: mt ? mt : 2,
        mb: 2,
      }}
      InputProps={{
        sx: {
          width: 1,
          '&:hover:not(.Mui-disabled)::before': {
            borderColor: 'rgba(0, 0, 0, 0.42)',
          },
        },
      }}
      label={label}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SettingsTextField;
