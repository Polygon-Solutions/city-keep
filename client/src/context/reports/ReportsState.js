import React, { useCallback, useReducer } from 'react';

import ReportsContext from './ReportsContext';
import ReportsReducer from './ReportsReducer';

import { LOAD_REPORTS } from '../types';

/**
 * *
 * ReportsState
 * @description
    - Exposes state object and functions through the 
      ReportsContext which pertain to the reports that are 
      submitted and displayed
    - State: [] (array of reports)
    - Functions: submitReport, loadReports, loadUserReports
 * @listens index.jsx
 */
const ReportsState = ({ children }) => {
  // State
  const initialState = [];

  const [state, dispatch] = useReducer(
    ReportsReducer,
    initialState
  );

  /** 
   * *
   * Submit Report
   * @description 
      - Creates a new Date object
      - Awaits fetch(/api/reports)-POST to load the new 
        report in the database
      - Returns the report object for use in the success 
        message (and possibly other future features)
      - On failure, the error propagates to where the 
        function is called
   * @param {string} userId
   * @param {string} title
   * @param {number} category_id
   * @param {string} description
   * @param {string} address
   * @listens ReportForm.jsx
   * @fires fetch('/api/reports')-POST
   * @returns {Object}
   */
  const submitReport = async (
    userId,
    title,
    category_id,
    description,
    address
  ) => {
    const reportTime = new Date();

    const { report } = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        title,
        category_id,
        description,
        report_time: reportTime,
        address,
      }),
    }).then((res) => res.json());

    return report;
  };

  /** 
   * *
   * Load Reports
   * @description 
      - Uses useCallback hook to cache the function 
        declaration while the component is mounted
      - Awaits fetch(/api/reports)-GET to retrieve the 50 
        most recent reports in the database
      - Dispatches the reports array to the reducer to 
        update the state
      - On failure, the error propagates to where the 
        function is called
   * @listens ReportsPage.jsx
   * @fires fetch('/api/reports')-GET
   * @fires dispatch:LOAD_REPORTS
   */
  const loadReports = useCallback(async () => {
    const { reports } = await fetch('/api/reports', {
      method: 'GET',
    }).then((res) => res.json());

    dispatch({
      type: LOAD_REPORTS,
      payload: { reports },
    });
  }, []);

  /** 
   * *
   * Load Reports
   * @description 
      - Uses useCallback hook to cache the function 
        declaration while the component is mounted
      - Awaits fetch(/api/reports/[userId])-GET to retrieve 
        the 50 most recent reports in the database that 
        belong to the specified user
      - Dispatches the reports array to the reducer to 
        update the state
      - On failure, the error propagates to where the 
        function is called
   * @param {string} userId
   * @listens ReportsPage.jsx
   * @fires fetch('/api/reports/[userId]')-GET
   * @fires dispatch:LOAD_REPORTS
   */
  const loadUserReports = useCallback(async (userId) => {
    const { reports } = await fetch(`/api/reports/${userId}`, {
      method: 'GET',
    }).then((res) => res.json());

    dispatch({
      type: LOAD_REPORTS,
      payload: { reports },
    });
  }, []);

  return (
    <ReportsContext.Provider
      value={{
        reports: state,
        submitReport,
        loadReports,
        loadUserReports,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsState;
