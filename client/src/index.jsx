import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Account } from './auth/Account';

ReactDOM.render(
  <Account>
    <App />
  </Account>,
  document.getElementById('root')
);
