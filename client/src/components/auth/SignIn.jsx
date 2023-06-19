import React, { useState, useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';

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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // State Handler
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Context
  const { signIn } = useContext(AccountContext);
  const { addAlert } = useContext(AlertsContext);

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
      addAlert('Please enter an email.', 'warning');
      return;
    }
    if (validateEmail(email)) {
      addAlert('Please enter a valid email.', 'warning');
      return;
    }
    if (password === '') {
      addAlert('Please enter a password.', 'warning');
      return;
    }
    if (validatePassword(password)) {
      addAlert(
        'Please enter a password with 8 or more characters, containing an uppercase and a lowercase letter, a number, and a special character.',
        'warning'
      );
      return;
    }
    try {
      await signIn(email, password);
    } catch (err) {
      addAlert(err.message, 'error');
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
          name="email"
          value={email}
          onChange={handleFormChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleFormChange}
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
