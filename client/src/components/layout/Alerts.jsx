import React, { useState, useContext, useEffect } from 'react';

import AccountContext from '../../context/account/AccountContext';

import { Alert, Grid, Snackbar } from '@mui/material';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  const { isAuthenticated } = useContext(AccountContext);

  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        { msg: 'Alert 1', type: 'error', id: 1 },
        { msg: 'Alert 2', type: 'success', id: 2 },
      ]);
    }, 1000);
  }, []);

  const handleClose = (event, reason, id) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
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
              sx={{ width: 1 }}
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
