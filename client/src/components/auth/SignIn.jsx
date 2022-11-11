import React from 'react';

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
  const handleSubmit = (event) => {
    event.preventDefault();

    // AWS Cognito Sign In
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <WorkInProgress>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
