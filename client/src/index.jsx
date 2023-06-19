import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AccountState from './context/account/AccountState';
import ReportsState from './context/reports/ReportsState';
import AlertsState from './context/alerts/AlertsState';

/** 
 * *
 * index.jsx
 * @description 
    - Used to render the App component in the root element 
      on load
    - Provides the Context API to the App component (which 
      is done in a parent component so that the Context 
      State is available in the body of the App component)
 */

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
