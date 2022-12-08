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
                  //getUserAttributes error
                  reject(err);
                }
              });
            } else {
              //getSession error
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

        const cognitoUserData = await cognitoPromise;
        const res = await databasePromise;
        const databaseUserData = await res.json();

        console.log(cognitoUserData);
        console.log(databaseUserData);
        if (
          cognitoUserData.attributes.email ===
          databaseUserData.user.email
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
