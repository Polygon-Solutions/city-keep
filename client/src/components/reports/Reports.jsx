import React, { useContext } from 'react';
import ReportsContext from '../../context/reports/ReportsContext';
import Report from './Report';

import { Typography } from '@mui/material';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date) => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

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
      {reports.map(
        ({
          id,
          reportTime,
          title,
          category,
          description,
          address,
          firstName,
          lastName,
        }) => {
          const name = `${firstName} ${lastName}`;
          const date = new Date(reportTime);
          const dateText = formatDate(date);
          return (
            <Report
              key={id}
              title={title}
              dateText={dateText}
              category={category}
              description={description}
              address={address}
              name={name}
            />
          );
        }
      )}
    </>
  );
};

export default Reports;
