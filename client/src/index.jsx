import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AccountState from './context/account/AccountState';
import ReportsState from './context/reports/ReportsState';
import AlertsState from './context/alerts/AlertsState';
import DisplayState from './context/display/DisplayState';

ReactDOM.render(
  <React.StrictMode>
    <DisplayState>
      <AlertsState>
        <AccountState>
          <ReportsState>
            <App />
          </ReportsState>
        </AccountState>
      </AlertsState>
    </DisplayState>
  </React.StrictMode>,
  document.getElementById('root')
);
