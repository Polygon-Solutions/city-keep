import React, { useContext } from 'react';

import AlertsContext from '../../context/alerts/AlertsContext';

import {
  Alert as MuiAlert,
  Grid,
  Snackbar,
} from '@mui/material';

const Alert = ({ alert }) => {
  const { removeAlert } = useContext(AlertsContext);

  const handleClose = (event, reason, id) => {
    if (reason === 'clickaway') {
      return;
    }

    removeAlert(id);
  };
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

export default Alert;
