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

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, signIn } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  const emailChecker = useEmailChecker;
  const passwordChecker = usePasswordChecker;
  const navigate = useNavigate();

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
