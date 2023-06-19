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

/**
 * *
 * AccountState
 * @description
    - Exposes state object and functions through the 
      AccountContext which pertain to the user and 
      authentication
    - State: isAuthenticated, user, cognitoUser
    - Functions: loadUser, signUp, verifyUser, signIn, 
      changePassword, logout
 * @listens index.jsx
 */
const AccountState = ({ children }) => {
  // State
  const initialState = {
    isAuthenticated: false,
    user: null,
    cognitoUser: null,
  };

  const [state, dispatch] = useReducer(
    AccountReducer,
    initialState
  );

  /** 
   * *
   * Load User
   * @description 
      - Gets current user from storage (Pool.getCurrentUser)
      - Awaits three promises (Promise.all):
         1. cognitoUser.getSession for getting a session, 
            either from the session object or from the local 
            storage, or by using a refresh token
         2. cognitoUser.getUserAttributes for getting a list 
            of attributes once authenticated
         3. fetch(/api/users)-GET for getting the user data 
            from the database using the cognito id in the 
            User-Id header
      - Dispatches the data to the reducer to update the 
        state.
      - On failure, the error propagates to where the 
        function is called
   * @listens App.jsx
   * @listens signIn()
   * @listens changePassword()
   * @fires Pool.getCurrentUser()
   * @fires cognitoUser.getSession()
   * @fires cognitoUser.getUserAttributes()
   * @fires fetch('/api/users')-GET
   * @fires dispatch:LOAD_USER
   */
  const loadUser = async () => {
    const cognitoUser = Pool.getCurrentUser();
    if (!cognitoUser) {
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const [_, attributes, { user }] = await Promise.all([
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

    // console.log(user); // For simple testing :P

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

  /** 
   * *
   * Sign Up
   * @description 
      - Awaits Pool.signUp to register the user with the 
        user details
      - Awaits fetch(/api/users)-POST to store the user 
        data from Cognito to the database
      - Dispatches the cognito data to the reducer to 
        update the cognitoUser state
      - On failure, the error propagates to where the 
        function is called
      - Note: the cognitoUser state object will then be 
        used to verify the user (see verifyUser below)
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   * @listens SignUp.jsx
   * @fires Pool.signUp()
   * @fires fetch('/api/users')-POST
   * @fires dispatch:LOAD_COGNITO_USER
   */
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

  /** 
   * *
   * Verify User
   * @description 
      - Awaits code verification (confirmRegistration) from 
        the cognitoUser state object
      - On failure, the error propagates to where the 
        function is called
      - Note: the user will then be redirected to the 
        landing page to sign in
   * @param {number} verificationCode
   * @listens VerifyUser.jsx
   * @fires state.cognitoUser.confirmRegistration()
   */
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

  /** 
   * *
   * Sign In
   * @description 
      - Creates a new CognitoUser object (cognitoUser)
      - Creates a new AuthenticationDetails object 
        (authDetails)
      - Awaits cognitoUser.authenticateUser to authenticate 
        the user
      - On success, loads user (loadUser)
      - On failure, the error propagates to where the 
        function is called
      - Note: when the user data is loaded, the AuthOutlet 
        will cause the page to be redirected to /reports
   * @param {string} email
   * @param {string} password
   * @listens SignIn.jsx
   * @listens SignUp.jsx
   * @fires cognitoUser.authenticateUser()
   * @fires loadUser()
   */
  const signIn = async (email, password) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
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

  /** 
   * *
   * Change Password
   * @description 
      - Awaits loadUser() to validate the session and to 
        store the cognitoUser object in the state
      - Awaits changePassword() to update the password on 
        Cognito
      - On failure, the error propagates to where the 
        function is called
   * @param {string} currentPassword
   * @param {string} newPassword
   * @listens ChangePassword.jsx
   * @fires loadUser()
   * @fires state.cognitoUser.changePassword()
   */
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

  /** 
   * *
   * Logout
   * @description
      - Gets current user from storage (Pool.getCurrentUser)
      - Signs the user out with cognitoUser.signOut()
      - Dispatches an action to the reducer to unload the 
        user
   * @listens Logout.jsx
   * @fires Pool.getCurrentUser()
   * @fires cognitoUser.signOut()
   * @fires dispatch:UNLOAD_USER
   */
  const logout = () => {
    const cognitoUser = Pool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
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
