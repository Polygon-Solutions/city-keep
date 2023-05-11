import React, { useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import Alert from './Alert';

import { Grid } from '@mui/material';

const Alerts = () => {
  const { isAuthenticated } = useContext(AccountContext);
  const { alerts } = useContext(AlertsContext);

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
        bottom: isAuthenticated && 90,
      }}
    >
      {alerts.map((alert) => (
        <Alert alert={alert} />
      ))}
    </Grid>
  );
};

export default Alerts;
