import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';

/**
 * *
 * SettingsTextField Component
 * @description
    - A styled MUI TextField component that is customized 
      for the Settings page.
 * @param {String} props.label - the button label
 * @param {String} props.color - the button color
 * @param {Number} props.mt - the TextField margin top
 * @param {String} props.type - the native type attribute
 * @param {String} props.value - the text field string value
 * @param {Function} props.setValue - the value handler
 * @listens ChangePassword
 */
const SettingsTextField = ({
  label,
  color = 'secondary',
  mt = 2,
  type,
  value,
  setValue,
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
      value={value}
      onChange={(event) => setValue(event.target.value)}
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
  setValue: PropTypes.func.isRequired,
};

export default SettingsTextField;
