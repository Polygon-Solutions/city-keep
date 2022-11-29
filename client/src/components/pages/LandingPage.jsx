import React from 'react';
import PropTypes from 'prop-types';

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

import { Grid, Tabs, Tab, Box } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      <Box sx={{ p: 3 }}>{children[value]}</Box>
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
};

const LandingPage = ({ setAuth }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Sign In"></Tab>
          <Tab label="Sign Up"></Tab>
        </Tabs>
        <TabPanel value={value}>
          <SignIn setAuth={setAuth} />
          <SignUp setAuth={setAuth} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
