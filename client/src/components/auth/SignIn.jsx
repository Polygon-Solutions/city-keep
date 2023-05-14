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

/**
 * *
 * SignIn Component
 * @description
    - Renders a form for signing in with an email address
      and a password.
    - Renders a button that triggers the signIn function
    - Renders a link to the forgot password page
 * @listens NoAuthOutlet (but imported into App.jsx)
 * @fires AccountContext.signIn
 */
const SignIn = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Context
  const { signIn } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  // Hooks
  const emailChecker = useEmailChecker;
  const passwordChecker = usePasswordChecker;

  /** 
   * *
   * Handle Sign In
   * @description 
      - Checks if email and password are valid
      - If valid, attempts to sign user in
      - If not valid, displays warning messages
      - If error from backend, displays error message
   * @listens Box (form) submission
   * @fires AccountContext.signIn
   */
  const handleSignIn = async (event) => {
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

  // Render
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          autoFocus
          label="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
