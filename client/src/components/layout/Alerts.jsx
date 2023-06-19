import React, { useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import Alert from './Alert';

import { Grid } from '@mui/material';

/**
 * *
 * Alerts Component
 * @description
    - Maps the alerts array to render Alert components
    - Positions the alerts according to authentication
 * @listens Router (but imported into App.jsx)
 */
const Alerts = () => {
  // Context
  const { isAuthenticated } = useContext(AccountContext);
  const { alerts } = useContext(AlertsContext);

  // Render
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
        zIndex: 1500,
      }}
    >
      {alerts.map((alert) => (
        <Alert alert={alert} key={alert.id} />
      ))}
    </Grid>
  );
};

export default Alerts;
