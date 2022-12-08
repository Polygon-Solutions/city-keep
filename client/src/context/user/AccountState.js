import React, { useReducer } from 'react';

import AccountContext from './AccountContext';
import AccountReducer from './AccountReducer';

import {
  LOAD_USER,
  UNLOAD_USER,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from '../types';

import {
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import Pool from '../../utils/UserPool';

const AccountState = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const [state, dispatch] = useReducer(
    AccountReducer,
    initialState
  );

  const loadUser = async () => {
    try {
      const user = Pool.getCurrentUser();
      if (user) {
        const cognitoPromise = new Promise((resolve, reject) => {
          user.getSession((err, sessionData) => {
            if (!err) {
              user.getUserAttributes((err, attributes) => {
                if (!err) {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve({
                    sessionData,
                    attributes: results,
                  });
                } else {
                  reject(err);
                }
              });
            } else {
              reject(err);
            }
          });
        });

        const databasePromise = fetch('/api/users', {
          method: 'GET',
          headers: {
            // 'User-Id': user.username,
            'User-Id': 2,
          },
        });

        const cogUserData = await cognitoPromise;
        const res = await databasePromise;
        const dbUserData = await res.json();

        console.log(cogUserData);
        console.log(dbUserData);
        if (
          cogUserData.attributes.email === dbUserData.user.email
        ) {
          //setauth
          //load user action from database data
        } else {
          throw new Error(
            'Inconsistent data between Cognito and database'
          );
        }
      } else {
        throw new Error('No user in storage.');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const signUp = (firstName, lastName, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cogUserData = await new Promise(
          (resolve, reject) => {
            Pool.signUp(
              email,
              password,
              [],
              null,
              (err, data) => {
                if (!err) {
                  resolve(data);
                } else {
                  reject(err);
                }
              }
            );
          }
        );

        const res = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: cogUserData.userSub,
            firstName,
            lastName,
            email,
          }),
        });
        const dbUserData = await res.json();

        console.log(cogUserData);
        console.log(dbUserData);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  const signIn = async (username, password) => {
    try {
      await new Promise((resolve, reject) => {
        const user = new CognitoUser({
          Username: username,
          Pool,
        });

        const authDetails = new AuthenticationDetails({
          Username: username,
          Password: password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: () => {
            resolve();
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
      loadUser();
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      //set auth false
    }
  };

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loadUser,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;
