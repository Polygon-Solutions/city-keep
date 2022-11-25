import React, { useState } from 'react';

import {
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import UserPool from '../../auth/UserPool';

import WorkInProgress from '../dev/WorkInProgress';

import {
  Link,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('onSuccess: ', data);
      },
      onFailure: (err) => {
        console.error('onFailure ', err);
      },
      newPasswordRequired: (data) => {
        console.log('newPasswordRequired: ', data);
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          autoFocus
          required
          id="email"
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          id="password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <WorkInProgress placement="right">
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" />
            }
            label="Remember me"
          />
        </WorkInProgress>
        <WorkInProgress placement="bottom-end">
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            Sign In
          </Button>
        </WorkInProgress>

        <Link href="/forgotpassword" variant="body2">
          Forgot Password?
        </Link>
      </Box>
    </Container>
  );
};

export default SignIn;
