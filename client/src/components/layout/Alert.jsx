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
 * @param {Object} props.alert
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
  const handleClose = (event, reason, id) => {
    if (reason === 'clickaway') {
      return;
    }
    removeAlert(id);
  };

  // Render
  return (
    <Grid item>
      <Snackbar
        open
        sx={{ position: 'static' }}
        autoHideDuration={5000}
        onClose={(event, reason) =>
          handleClose(event, reason, alert.id)
        }
      >
        <MuiAlert
          severity={alert.type}
          onClose={(event, reason) =>
            handleClose(event, reason, alert.id)
          }
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
