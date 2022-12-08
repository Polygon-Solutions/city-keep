import React, { useState, useContext } from 'react';

import AccountContext from '../../context/user/AccountContext';

import WorkInProgress from '../dev/WorkInProgress';

import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
} from '@mui/material';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, signIn } = useContext(AccountContext);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      signUp(firstName, lastName, email, password);
      //Redirect to verification page
    } catch (err) {
      console.log(err);
    }
  };

  const handleDemo = () => {
    signIn(
      process.env.REACT_APP_DEMO_USERNAME,
      process.env.REACT_APP_DEMO_PASSWORD
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <WorkInProgress placement="bottom">
          <Button
            fullWidth
            variant="contained"
            sx={{ my: 3 }}
            type="submit"
          >
            Sign Up
          </Button>
        </WorkInProgress>
      </Box>
      <Typography align="center">OR</Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ my: 3 }}
        type="button"
        onClick={handleDemo}
      >
        Try a demo
      </Button>
    </Container>
  );
};

export default SignUp;
