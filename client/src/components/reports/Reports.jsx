import React, { useContext } from 'react';
import ReportsContext from '../../context/reports/ReportsContext';
import Report from './Report';

import { Typography } from '@mui/material';

const Reports = () => {
  const { reports } = useContext(ReportsContext);

  if (reports.length === 0) {
    return (
      <Typography sx={{ my: 2, textAlign: 'center' }}>
        You haven't made any reports.
      </Typography>
    );
  }

  return (
    <>
      {reports.map((report) => {
        return <Report key={report.id} report={report} />;
      })}
    </>
  );
};

export default Reports;
