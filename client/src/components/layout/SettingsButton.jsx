import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from '@mui/material';

/**
 * *
 * SettingsButton Component
 * @description
    - A styled MUI Button component that is customized for 
      the Settings page.
 * @prop {string} color - the button color
 * @prop {string} label - the button label
 * @prop {string} type - the native type attribute
 * @prop {Function} handleClick - the click handler
 * @listens ChangePassword
 * @listens Logout
 */
const SettingsButton = ({ color, label, type, handleClick }) => {
  // Render
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
          {label}
        </Button>
      </Grid>
    </Grid>
  );
};

// PropTypes
SettingsButton.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleClick: PropTypes.func,
};

export default SettingsButton;
