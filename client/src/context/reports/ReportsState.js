import React, { useCallback, useReducer } from 'react';

import ReportsContext from './ReportsContext';
import ReportsReducer from './ReportsReducer';

import { LOAD_REPORTS } from '../types';

const ReportsState = ({ children }) => {
  const initialState = {
    reports: [],
  };

  const [state, dispatch] = useReducer(
    ReportsReducer,
    initialState
  );

  const submitReport = async (
    userId,
    title,
    category,
    description,
    address
  ) => {
    const reportTime = new Date();

    const newReport = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        title,
        category_id: category,
        description,
        report_time: reportTime,
        address,
      }),
    }).then((res) => res.json());
    console.log(newReport.report);
  };

  const loadReports = useCallback(async () => {
    const { reports } = await fetch('/api/reports', {
      method: 'GET',
    }).then((res) => res.json());
    dispatch({
      type: LOAD_REPORTS,
      payload: { reports },
    });
  }, []);

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
        reports: state.reports,
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
