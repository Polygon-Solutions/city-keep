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
  const [auth, setAuth] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session: ', session);
        setAuth(true);
      })
      .catch((err) => {
        console.log('No session.');
        setAuth(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {!auth && <Heading />}
        <Routes>
          <Route
            element={<NoAuthOutlet isAuthenticated={auth} />}
          >
            <Route
              path="/"
              element={<LandingPage setAuth={setAuth} />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
            />
          </Route>
          <Route element={<AuthOutlet isAuthenticated={auth} />}>
            <Route path="reports" element={<ReportsPage />} />
            <Route
              path="settings"
              element={<SettingsPage setAuth={setAuth} />}
            />
          </Route>
        </Routes>
        {auth && <Navbar />}
      </Router>
    </ThemeProvider>
  );
};

export default App;
