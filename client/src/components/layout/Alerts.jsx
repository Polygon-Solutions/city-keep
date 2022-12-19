import React, { useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import { Alert, Grid, Snackbar } from '@mui/material';

const Alerts = () => {
  const { isAuthenticated } = useContext(AccountContext);
  const { alerts, removeAlert } = useContext(AlertsContext);

  const handleClose = (event, reason, id) => {
    if (reason === 'clickaway') {
      return;
    }

    removeAlert(id);
  };

  return (
    <Grid
      container
      direction="column-reverse"
      alignItems="stretch"
      rowSpacing={1}
      sx={{
        width: 1,
        maxWidth: 'calc(100vh * 0.75)',
        px: 1,
        pb: 1,
        position: 'fixed',
        bottom: isAuthenticated ? 90 : 0,
      }}
    >
      {alerts.map((alert) => (
        <Grid item key={alert.id}>
          <Snackbar
            open
            sx={{ position: 'static' }}
            autoHideDuration={5000}
            onClose={(event, reason) =>
              handleClose(event, reason, alert.id)
            }
          >
            <Alert
              severity={alert.type}
              onClose={(event, reason) =>
                handleClose(event, reason, alert.id)
              }
              sx={{ width: 1, alignItems: 'center' }}
            >
              {alert.msg}
            </Alert>
          </Snackbar>
        </Grid>
      ))}
    </Grid>
  );
};

export default Alerts;
