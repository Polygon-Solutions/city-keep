import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Account';

const Status = () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session: ', session);
        setStatus(true);
      })
      .catch((err) => {
        console.log('Error getting session: ', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status ? (
        <button onClick={logout}>Logout</button>
      ) : (
        'Please sign in.'
      )}
    </div>
  );
};

export default Status;
