import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';

/**
 * *
 * SettingsTextField Component
 * @description
    - A styled MUI TextField component that is customized 
      for the Settings page.
 * @prop {string} label - the button label
 * @prop {string} color - the button color
 * @prop {number} mt - the TextField margin top
 * @prop {string} type - the native type attribute
 * @prop {string} name - the native name attribute
 * @prop {string} value - the text field string value
 * @prop {Function} handleValueChange - the value handler
 * @listens ChangePassword
 */
const SettingsTextField = ({
  label,
  color = 'secondary',
  mt = 2,
  type,
  name,
  value,
  handleValueChange,
}) => {
  // Render
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
        mt,
        mb: 2,
      }}
      InputProps={{
        sx: {
          width: 1,
          '&:hover:not(.Mui-disabled)::before': {
            borderColor: 'rgba(0, 0, 0, 0.42)',
          }, // Grey border on hover (default was black)
        },
      }}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={handleValueChange}
    />
  );
};

// PropTypes
SettingsTextField.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  mt: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};

export default SettingsTextField;
