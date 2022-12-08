import React, { useState, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AccountContext from './context/user/AccountContext';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.jsx';

//Components
import Navbar from './components/layout/Navbar';
import Heading from './components/layout/Heading';
import AuthOutlet from './components/routing/AuthOutlet';
import NoAuthOutlet from './components/routing/NoAuthOutlet';
import ReportsPage from './components/pages/ReportsPage';
import SettingsPage from './components/pages/SettingsPage';
import LandingPage from './components/pages/LandingPage';
import ForgotPassword from './components/pages/ForgotPassword';

const App = () => {
  const { isAuthenticated, loadUser } =
    useContext(AccountContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {!isAuthenticated && <Heading />}
        <Routes>
          <Route
            element={
              <NoAuthOutlet isAuthenticated={isAuthenticated} />
            }
          >
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
            />
          </Route>
          <Route
            element={
              <AuthOutlet isAuthenticated={isAuthenticated} />
            }
          >
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        {isAuthenticated && <Navbar />}
      </Router>
    </ThemeProvider>
  );
};

export default App;
