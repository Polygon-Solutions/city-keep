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

/**
 * *
 * ReportsPage Component
 * @description
    - Renders the page heading
    - Renders a control panel for the reports, with buttons 
      for filtering by current user and for refreshing the 
      reports
    - Renders the Reports component 
 * @listens AuthOutlet (but imported into App.jsx)
 * @fires ReportsContext.loadReports
 * @fires ReportsContext.loadUserReports
 */
const ReportsPage = () => {
  // State
  const [filterUser, setFilterUser] = useState(false);

  // State Handler
  const handleFilterUser = (event) =>
    setFilterUser(event.target.checked);

  // Context
  const { loadReports, loadUserReports } =
    useContext(ReportsContext);
  const { user } = useContext(AccountContext);
  const { addAlert } = useContext(AlertsContext);

  /** 
   * *
   * Handle Reports
   * @description 
      - Loads all reports in state
      - Filters reports by current user when the filter 
        checkbox is checked
      - Displays alert for an error message from database
   * @listens IconButton,useEffect
   * @fires ReportsContext.loadReports
   * @fires ReportsContext.loadUserReports
   */
  const handleReports = async () => {
    try {
      if (!filterUser) {
        await loadReports();
      } else {
        await loadUserReports(user.id);
      }
    } catch (err) {
      addAlert(err.message, 'error');
    }
  };

  /** 
   * *
   * Reports useEffect Hook
   * @description 
      - Runs handleReports when component mounts and 
        whenever the 'filter current user' checkbox is 
        changed
  */
  useEffect(() => {
    handleReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUser]);

  // Render
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
              onChange={handleFilterUser}
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
          }} // slotProps: changing label text variant and color
        />
        <IconButton
          onClick={handleReports} // refresh handler
        >
          <RefreshIcon />
        </IconButton>
      </Grid>
      <Reports />
    </Page>
  );
};

export default ReportsPage;
