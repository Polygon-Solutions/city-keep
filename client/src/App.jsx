import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AccountContext from './context/account/AccountContext';

//Components
import Navbar from './components/layout/Navbar';
import Heading from './components/layout/Heading';
import AuthOutlet from './components/routing/AuthOutlet';
import NoAuthOutlet from './components/routing/NoAuthOutlet';
import ReportsPage from './components/pages/ReportsPage';
import SettingsPage from './components/pages/SettingsPage';
import LandingPage from './components/pages/LandingPage';
import ForgotPassword from './components/pages/ForgotPassword';
import VerifyUser from './components/pages/VerifyUser';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.jsx';
import { Paper } from '@mui/material';

const App = () => {
  const { isAuthenticated, loadUser } =
    useContext(AccountContext);

  useEffect(() => {
    const load = async () => {
      try {
        await loadUser();
      } catch (err) {
        console.log(err.message);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          maxWidth: 'calc(100vh * 0.75)',
          minHeight: '100vh',
          position: 'relative',
          margin: '0 auto',
        }}
        elevation={24}
      >
        <Router>
          {!isAuthenticated && <Heading />}
          <Routes>
            <Route
              element={
                <NoAuthOutlet
                  isAuthenticated={isAuthenticated}
                />
              }
            >
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/forgotpassword"
                element={<ForgotPassword />}
              />
              <Route path="/verify" element={<VerifyUser />} />
            </Route>
            <Route
              element={
                <AuthOutlet isAuthenticated={isAuthenticated} />
              }
            >
              <Route path="reports" element={<ReportsPage />} />
              <Route
                path="settings"
                element={<SettingsPage />}
              />
            </Route>
          </Routes>
          {isAuthenticated && <Navbar />}
        </Router>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
