import React, { useReducer } from 'react';

import AccountContext from './AccountContext';
import AccountReducer from './AccountReducer';

import {
  LOAD_USER,
  LOAD_COGNITO_USER,
  UNLOAD_USER,
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
    cognitoUser: null,
  };

  const [state, dispatch] = useReducer(
    AccountReducer,
    initialState
  );

  const loadUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const cognitoUser = Pool.getCurrentUser();
        if (cognitoUser) {
          const cognitoPromise = new Promise(
            (resolve, reject) => {
              cognitoUser.getSession((err, sessionData) => {
                if (!err) {
                  cognitoUser.getUserAttributes(
                    (err, attributes) => {
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
                    }
                  );
                } else {
                  reject(err);
                }
              });
            }
          );

          const databasePromise = fetch('/api/users', {
            method: 'GET',
            headers: {
              'User-Id': cognitoUser.username,
            },
          });

          const cognitoData = await cognitoPromise;
          const res = await databasePromise;
          const databaseData = await res.json();

          console.log(cognitoData);
          console.log(databaseData);

          const { user } = databaseData;

          if (cognitoData.attributes.email === user.email) {
            dispatch({
              type: LOAD_USER,
              payload: {
                user: {
                  id: user.id,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                },
                cognitoUser,
              },
            });
            resolve();
          } else {
            throw new Error(
              'Inconsistent data between Cognito and database'
            );
          }
        } else {
          throw new Error('No user in storage.');
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const signUp = (firstName, lastName, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cognitoData = await new Promise(
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
            userId: cognitoData.userSub,
            firstName,
            lastName,
            email,
          }),
        });
        const databaseData = await res.json();

        console.log(cognitoData);
        console.log(databaseData);

        dispatch({
          type: LOAD_COGNITO_USER,
          payload: { cognitoUser: cognitoData.user },
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  const verifyUser = async (verificationCode) => {
    return new Promise((resolve, reject) => {
      state.cognitoUser.confirmRegistration(
        verificationCode,
        true,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
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
      await loadUser();
    } catch (err) {
      console.log(err.message);
    }
  };

  const changePassword = (currentPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
      try {
        await loadUser();
        state.cognitoUser.changePassword(
          currentPassword,
          newPassword,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      dispatch({
        type: UNLOAD_USER,
      });
    }
  };

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        cognitoUser: state.cognitoUser,
        loadUser,
        signUp,
        verifyUser,
        signIn,
        changePassword,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;
