import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AccountState from './context/account/AccountState';
import ReportsState from './context/reports/ReportsState';

ReactDOM.render(
  <React.StrictMode>
    <AccountState>
      <ReportsState>
        <App />
      </ReportsState>
    </AccountState>
  </React.StrictMode>,
  document.getElementById('root')
);
