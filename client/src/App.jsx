import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { Account } from './auth/Account';
import Status from './auth/Status';

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
import AuthSwitch from './components/dev/AuthSwitch.jsx';

const App = () => {
  const [auth, setAuth] = useState(false);
  const handleAuth = (event) => {
    setAuth(event.target.checked);
  };

  return (
    <Account>
      <ThemeProvider theme={theme}>
        <Router>
          <Status />
          {!auth && <Heading />}
          <AuthSwitch checked={auth} onChange={handleAuth} />
          <Routes>
            <Route
              element={<NoAuthOutlet isAuthenticated={auth} />}
            >
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/forgotpassword"
                element={<ForgotPassword />}
              />
            </Route>
            <Route
              element={<AuthOutlet isAuthenticated={auth} />}
            >
              <Route path="reports" element={<ReportsPage />} />
              <Route
                path="settings"
                element={<SettingsPage />}
              />
            </Route>
          </Routes>
          {auth && <Navbar />}
        </Router>
      </ThemeProvider>
    </Account>
  );
};

export default App;
