import React, { useState, useContext } from 'react';

import UserPool from '../../utils/UserPool';
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

const SignUp = ({ setAuth }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        setAuth(true);
      }
    });
  };

  const handleDemo = () => {
    authenticate(
      process.env.REACT_APP_DEMO_USERNAME,
      process.env.REACT_APP_DEMO_PASSWORD
    )
      .then((data) => {
        console.log('Signed in!', data);
        setAuth(true);
      })
      .catch((err) => {
        console.log('Failed to sign in.', err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
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
