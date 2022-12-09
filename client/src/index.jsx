import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AccountState from './context/user/AccountState';

ReactDOM.render(
  <React.StrictMode>
    <AccountState>
      <App />
    </AccountState>
  </React.StrictMode>,
  document.getElementById('root')
);
