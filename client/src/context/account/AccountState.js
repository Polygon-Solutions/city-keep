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

  const loadUser = async () => {
    const cognitoUser = Pool.getCurrentUser();
    if (!cognitoUser) {
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const [_, attributes, databaseData] = await Promise.all([
      new Promise((resolve, reject) => {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      }),
      new Promise((resolve, reject) => {
        cognitoUser.getUserAttributes((err, attributes) => {
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
      }),
      fetch('/api/users', {
        method: 'GET',
        headers: {
          'User-Id': cognitoUser.username,
        },
      }).then((res) => res.json()),
    ]);

    const { user } = databaseData;

    if (attributes.email !== user.email) {
      throw new Error(
        'Inconsistent data between Cognito and database'
      );
    }

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
  };

  const signUp = async (
    firstName,
    lastName,
    email,
    password
  ) => {
    const cognitoData = await new Promise((resolve, reject) => {
      Pool.signUp(email, password, [], null, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    await fetch('/api/users', {
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

    dispatch({
      type: LOAD_COGNITO_USER,
      payload: { cognitoUser: cognitoData.user },
    });
  };

  const verifyUser = async (verificationCode) => {
    await new Promise((resolve, reject) => {
      state.cognitoUser.confirmRegistration(
        verificationCode,
        true,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  const signIn = async (username, password) => {
    const user = new CognitoUser({
      Username: username,
      Pool,
    });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    await new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: async () => {
          await loadUser();
          resolve();
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };

  const changePassword = async (
    currentPassword,
    newPassword
  ) => {
    await loadUser();
    await state.cognitoUser.changePassword(
      currentPassword,
      newPassword,
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
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
