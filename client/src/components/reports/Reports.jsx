import React, { useContext } from 'react';

import ReportsContext from '../../context/reports/ReportsContext';

import ReportDetail from './ReportDetail';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const Reports = () => {
  const { reports } = useContext(ReportsContext);

  return (
    <>
      {reports.length !== 0 ? (
        reports.map((report) => {
          const date = new Date(report.reportTime);
          const dateText =
            date.getDate() +
            ' ' +
            months[date.getMonth()] +
            ' ' +
            date.getFullYear();

          const name = report.firstName + ' ' + report.lastName;
          return (
            <Accordion key={report.id} sx={{ my: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 3 }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {report.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: 'italic',
                      color: '#404040',
                      fontSize: '14px',
                    }}
                  >
                    {dateText}
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails
                sx={{ backgroundColor: '#ededed', px: 3 }}
              >
                <ReportDetail
                  label={'Category'}
                  detail={report.category}
                />
                <ReportDetail
                  label={'Description'}
                  detail={report.description}
                />
                <ReportDetail
                  label={'Address'}
                  detail={report.address}
                />
                <ReportDetail
                  label={'Submitted by'}
                  detail={name}
                />
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography sx={{ my: 2, textAlign: 'center' }}>
          You haven't made any reports.
        </Typography>
      )}
    </>
  );
};

export default Reports;
