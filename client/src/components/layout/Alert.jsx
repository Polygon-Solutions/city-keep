import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AlertsContext from '../../context/alerts/AlertsContext';

import {
  Alert as MuiAlert,
  Grid,
  Snackbar,
} from '@mui/material';

/**
 * *
 * Alert Component
 * @description
    - Renders an MUI Alert component within a snackbar
 * @prop {Object} alert - the alert object
 * @listens Alerts
 * @fires AlertsContext.removeAlert
 */
const Alert = ({ alert }) => {
  // Context
  const { removeAlert } = useContext(AlertsContext);

  /** 
   * *
   * Handle Close (alert clickaway)
   * @description 
      - Removes alert if the user clicks the X
      - Disables the Snackbar clickaway listener
   * @listens Snackbar
   */
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeAlert(alert.id);
  };

  // Render
  return (
    <Grid item>
      <Snackbar
        open
        sx={{ position: 'static' }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <MuiAlert
          severity={alert.type}
          onClose={handleClose}
          sx={{ width: 1, alignItems: 'center' }}
        >
          {alert.msg}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

// PropTypes
Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

export default Alert;
