import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import {
  TextField,
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';

/**
 * *
 * VerifyUser Component
 * @description
    - Renders a field for entering the verification code
    - Renders a button that triggers the verifyUser 
      function
 * @listens NoAuthOutlet (but imported into App.jsx)
 * @fires AccountContext.verifyUser
 */
const VerifyUser = () => {
  // State
  const [verificationCode, setVerificationCode] = useState('');

  // Context
  const { verifyUser } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  // Hooks
  const navigate = useNavigate();

  /** 
  * *
  * Handle Input
  * @description: 
      - Tests if the input is a number
      - If it is a number, set the verification code state 
        variable to the input
      - If it is not a number, the text won't change
  * @listens: TextField input
  */
  const handleInput = (event) => {
    if (
      event.target.value === '' ||
      /^[0-9\b]+$/.test(event.target.value)
    ) {
      setVerificationCode(event.target.value);
    }
  };

  /** 
  * *
  * Handle Verify
  * @description: 
      - Awaits verifyUser function
      - If successful, display a success message and 
        navigate to the home page (sign in)
      - If error from backend, displays error message
  * TODO: If verification code is not 6 figures, displays a warning message
  * @listens: Box (form) submission
  */
  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      await verifyUser(verificationCode);
      setAlert(
        'Entered verification code successfully, please log in.',
        'success'
      );
      navigate('/');
    } catch (err) {
      setAlert(err.message, 'error');
    }
  };

  //JSX
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h6" sx={{ mt: 3 }}>
        Verify Account
      </Typography>
      <Box
        component="form"
        onSubmit={handleVerify}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Verification Code"
          autoFocus
          value={verificationCode}
          onChange={(event) => handleInput(event)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Verify
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyUser;
