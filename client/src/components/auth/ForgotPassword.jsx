import React from 'react';

import WorkInProgress from '../dev/WorkInProgress';

import {
  TextField,
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';

/**
 * *
 * ForgotPassword Component
 * @description
    - Renders a text field that allows the user to enter 
      their email address
    - Renders a button that triggers the forgotPassword 
      function
 * TODO: Remove work in progress tooltip after implementing forgot password functionality
 * @listens NoAuthOutlet (but imported into App.jsx)
 * @fires AccountContext.forgotPassword
 */
const ForgotPassword = () => {
  /**
   * *
   * Handle Forgot Password
   * TODO: Add forgotPassword function into AccountState file.
   * @listens Box (form) submission
   */
  const handleForgotPassword = (event) => {
    event.preventDefault();

    // AWS Cognito Forgot Password
  };

  //JSX
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h6" sx={{ mt: 3 }}>
        Forgot Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleForgotPassword}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <WorkInProgress placement="bottom">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Recovery Email
          </Button>
        </WorkInProgress>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
