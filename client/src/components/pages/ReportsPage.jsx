import React, { useState, useContext, useEffect } from 'react';
import ReportsContext from '../../context/reports/ReportsContext';
import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import Reports from '../reports/Reports';
import Page from '../layout/Page';
import PageHeading from '../layout/PageHeading';

import {
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ReportsPage = () => {
  const [filterUser, setFilterUser] = useState(false);

  const { loadReports, loadUserReports } =
    useContext(ReportsContext);
  const { user } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  const handleReports = async () => {
    try {
      if (!filterUser) {
        await loadReports();
      } else {
        await loadUserReports(user.id);
      }
    } catch (err) {
      setAlert(err.message, 'error');
    }
  };

  useEffect(() => {
    handleReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUser]);

  const handleRefresh = () => {
    handleReports();
  };

  return (
    <Page pt={1}>
      <PageHeading>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h1">Reports</Typography>
          </Grid>
        </Grid>
      </PageHeading>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: '7px' }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={filterUser}
              onChange={(event) =>
                setFilterUser(event.target.checked)
              }
              value="filter-reports"
            />
          }
          label="My Reports"
          sx={{ ml: 0 }}
          slotProps={{
            typography: {
              variant: 'body1',
              sx: { color: '#3b3b3b' },
            },
          }}
        />
        <IconButton onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </Grid>
      <Reports />
    </Page>
  );
};

export default ReportsPage;
