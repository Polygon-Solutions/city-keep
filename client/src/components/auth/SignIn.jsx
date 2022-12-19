import React, { useState, useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import useEmailChecker from '../hooks/useEmailChecker';
import usePasswordChecker from '../hooks/usePasswordChecker';

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

  const { signIn } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  const emailChecker = useEmailChecker;
  const passwordChecker = usePasswordChecker;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === '') {
      setAlert('Please enter an email.', 'warning');
      return;
    }
    if (emailChecker(email)) {
      setAlert('Please enter a valid email.', 'warning');
      return;
    }
    if (password === '') {
      setAlert('Please enter a password.', 'warning');
      return;
    }
    if (passwordChecker(password)) {
      setAlert(
        'Please enter a password with 8 or more characters, containing an uppercase and a lowercase letter, a number, and a special character.',
        'warning'
      );
      return;
    }
    try {
      await signIn(email, password);
    } catch (err) {
      setAlert(err.message, 'error');
    }
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
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
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
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          type="submit"
        >
          Sign In
        </Button>

        <Link href="/forgotpassword" variant="body1">
          Forgot Password?
        </Link>
      </Box>
    </Container>
  );
};

export default SignIn;
