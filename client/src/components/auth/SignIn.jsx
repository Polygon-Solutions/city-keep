import React, { useState, useContext } from 'react';

import AccountContext from '../../context/user/AccountContext';

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

const SignIn = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
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
