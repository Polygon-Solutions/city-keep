import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import useEmailChecker from '../hooks/useEmailChecker';
import usePasswordChecker from '../hooks/usePasswordChecker';

import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
} from '@mui/material';

/**
 * *
 * SignUp Component
 * @description
    - Renders a form for signing up with a first and last 
      name, an email address, and a password.
    - Renders a button that triggers the signUp function
    - Renders a button that triggers the signIn function 
      with the demo credentials
 * @listens NoAuthOutlet (but imported into App.jsx)
 * @fires AccountContext.signUp
 * @fires AccountContext.signIn
 */
const SignUp = () => {
  // State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Context
  const { signUp, signIn } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  // Hooks
  const emailChecker = useEmailChecker;
  const passwordChecker = usePasswordChecker;
  const navigate = useNavigate();

  /** 
   * *
   * Handle Register
   * @description 
      - Checks if first name, last name, email, and 
        password fields are not empty
      - Checks if email and password are valid
      - If valid, awaits signUp function
      - If not valid, displays warning messages
      - If error from backend, displays error message
   * @listens Box (form) submission
   */
  const handleRegister = async (event) => {
    event.preventDefault();
    if (firstName === '') {
      setAlert('Please enter a first name.', 'warning');
      return;
    }
    if (lastName === '') {
      setAlert('Please enter a last name.', 'warning');
      return;
    }
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
      await signUp(firstName, lastName, email, password);
      setAlert(
        'Signed up successfully, please enter the verification code sent to your email.',
        'success'
      );
      navigate('/verify');
    } catch (err) {
      setAlert(err.message, 'error');
    }
  };

  /** 
   * *
   * Handle Demo
   * @description 
      - Signs in with demo account using the credentials 
        provided by .env
   * @listens Button click
   */
  const handleDemo = () => {
    signIn(
      process.env.REACT_APP_DEMO_USERNAME,
      process.env.REACT_APP_DEMO_PASSWORD
    );
  };

  // Render
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
              fullWidth
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          sx={{ my: 3 }}
          type="submit"
        >
          Sign Up
        </Button>
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
