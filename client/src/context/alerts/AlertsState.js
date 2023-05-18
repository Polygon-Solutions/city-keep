import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertsContext from './AlertsContext';
import AlertsReducer from './AlertsReducer';

import { ADD_ALERT, REMOVE_ALERT } from '../types';

/**
 * *
 * AlertsState
 * @description
    - Exposes state object and functions through the 
      AlertsContext which pertain to the displaying of 
      alerts
    - State: [] (array of alerts)
    - Functions: addAlert, removeAlert
 * @listens index.jsx
 */
const AlertsState = ({ children }) => {
  // State
  const initialState = [];

  const [state, dispatch] = useReducer(
    AlertsReducer,
    initialState
  );

  /** 
   * *
   * Add Alert
   * @description 
      - Makes a new uuid
      - If there is already more than one alert in the state, it dispatches the id to remove the alert
      - Dispatches the alert object to the reducer to 
        update the state
   * @param {string} msg
   * @param {string} type
   * @listens App.jsx
   * @listens ChangePassword.jsx
   * @listens SignIn.jsx
   * @listens SignUp.jsx
   * @listens VerifyUser.jsx
   * @listens ReportsPage.jsx
   * @listens ReportForm.jsx
   * @fires dispatch:REMOVE_ALERT
   * @fires dispatch:ADD_ALERT
   */
  const addAlert = (msg, type) => {
    const id = uuidv4();
    if (state.length > 1) {
      dispatch({ type: REMOVE_ALERT, payload: state[0].id });
    }
    dispatch({
      type: ADD_ALERT,
      payload: { msg, type, id },
    });
  };

  /** 
   * *
   * Remove Alert
   * @description 
      - Dispatches the alert id to remove the alert from 
        the state array
   * @param {string} id
   * @listens Alert.jsx
   * @fires dispatch:REMOVE_ALERT
   */
  const removeAlert = (id) => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  };

  return (
    <AlertsContext.Provider
      value={{
        alerts: state,
        addAlert,
        removeAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsState;
