import React, { useState } from 'react';

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

  const handleFilterUser = (event) => {
    setFilterUser(event.target.checked);
  };

  const handleRefresh = () => {
    console.log('Refresh!');
  };

  return (
    <Page mt={1}>
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
            />
          }
          label="Show my reports"
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
