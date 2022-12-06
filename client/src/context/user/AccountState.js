import React, { useReducer } from 'react';

import AccountContext from './AccountContext';
import AccountReducer from './AccountReducer';

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

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, sessionData) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise(
              (resolve, reject) => {
                user.getUserAttributes((err, attributes) => {
                  if (err) {
                    reject(err);
                  } else {
                    const results = {};

                    for (let attribute of attributes) {
                      const { Name, Value } = attribute;
                      results[Name] = Value;
                    }

                    resolve(results);
                  }
                });
              }
            );

            resolve({ user, ...sessionData, ...attributes });
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess: ', data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error('onFailure ', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired: ', data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        getSession,
        authenticate,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;
