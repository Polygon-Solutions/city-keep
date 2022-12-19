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

const VerifyUser = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const { verifyUser } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  const handleChange = (event) => {
    if (
      event.target.value === '' ||
      /^[0-9\b]+$/.test(event.target.value)
    ) {
      setVerificationCode(event.target.value);
    }
  };

  const navigate = useNavigate();

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
          onChange={(event) => handleChange(event)}
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
