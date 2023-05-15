import React, { useContext } from 'react';
import ReportsContext from '../../context/reports/ReportsContext';
import Report from './Report';

import { Typography } from '@mui/material';

/**
 * *
 * Reports Component
 * @description
    - Maps the reports array to render Report components
    - Renders a no reports message if there are no reports
 * @listens ReportsPage
 */
const Reports = () => {
  //Context
  const { reports } = useContext(ReportsContext);

  // Render - no reports
  if (reports.length === 0) {
    return (
      <Typography sx={{ my: 2, textAlign: 'center' }}>
        You haven't made any reports.
      </Typography>
    );
  }

  // Render - reports
  return (
    <>
      {reports.map((report) => {
        return <Report key={report.id} report={report} />;
      })}
    </>
  );
};

export default Reports;
