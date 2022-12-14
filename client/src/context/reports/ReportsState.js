import React, { useReducer } from 'react';

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

    const res = await fetch('/api/reports', {
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
    });
    const newReportData = await res.json();
    console.log(newReportData.report);
  };

  const loadReports = async () => {
    try {
      const res = await fetch('/api/reports', {
        method: 'GET',
      });
      const { reports } = await res.json();

      console.log(reports);
      dispatch({
        type: LOAD_REPORTS,
        payload: { reports },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loadUserReports = async (userId) => {
    try {
      const res = await fetch(`/api/reports/${userId}`, {
        method: 'GET',
      });
      const { reports } = await res.json();
      console.log(reports);
      dispatch({
        type: LOAD_REPORTS,
        payload: { reports },
      });
    } catch (err) {
      console.log(err);
    }
  };

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
