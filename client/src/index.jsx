import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AccountState from './context/account/AccountState';
import ReportsState from './context/reports/ReportsState';
import AlertsState from './context/alerts/AlertsState';

ReactDOM.render(
  <React.StrictMode>
    <AlertsState>
      <AccountState>
        <ReportsState>
          <App />
        </ReportsState>
      </AccountState>
    </AlertsState>
  </React.StrictMode>,
  document.getElementById('root')
);
