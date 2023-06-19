import React, { useState } from 'react';

import TabPanel from '../layout/TabPanel';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

import { Grid, Tabs, Tab } from '@mui/material';

/**
 * *
 * LandingPage Component
 * @description
    - Renders an MUI tabbed panel view with one tab for 
      SignIn and one tab for SignUp
    - Uses custom TabPanel component to render the tabs 
      using the array of children components
 * @listens NoAuthOutlet (but imported into App.jsx)
 */
const LandingPage = () => {
  // State
  const [tab, setTab] = useState(0);

  // State Handler
  const handleTabChange = (event, newValue) => setTab(newValue);

  // Render
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Sign In"></Tab>
          <Tab label="Sign Up"></Tab>
        </Tabs>
        <TabPanel value={tab}>
          <SignIn />
          <SignUp />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
