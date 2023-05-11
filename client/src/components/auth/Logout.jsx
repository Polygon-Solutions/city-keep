import React, { useContext } from 'react';

import AccountContext from '../../context/account/AccountContext';

import SettingsButton from '../layout/SettingsButton';

import { Typography } from '@mui/material';

const Logout = () => {
  const { logout } = useContext(AccountContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Typography variant="h4">Logout</Typography>
      <SettingsButton
        color="error"
        text="Logout"
        type="button"
        handleClick={handleLogout}
      />
    </>
  );
};

export default Logout;
