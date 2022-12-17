import React from 'react';

import { Grid, Button } from '@mui/material';

const SettingsButton = ({ color, text, type, handleClick }) => {
  return (
    <Grid container justifyContent="flex-start" sx={{ px: 2 }}>
      <Grid item xs={8} sm={6}>
        <Button
          color={color}
          variant="outlined"
          size="small"
          sx={{
            width: 1,
            display: 'block',
            borderWidth: 3,
            mt: 1,
            mb: 2,
            '&:hover': {
              borderWidth: 3,
            },
          }}
          type={type}
          onClick={handleClick}
        >
          {text}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsButton;
