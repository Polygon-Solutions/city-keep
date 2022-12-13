import React from 'react';

import ReportDetail from './ReportDetail';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const reports = [
  {
    id: 1,
    user: 'Christina Mary',
    title: 'Garbage Bags on Street',
    category: 'Litter Pickup',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae aperiam nesciunt libero quos nam necessitatibus ducimus iusto itaque voluptatum pariatur quis a quas, modi dolor numquam voluptates! Dignissimos, eius?',
    time: 'Mon Dec 12 2022 23:46:43 GMT+0100 (Central European Standard Time)',
    address: '1450 W Georgia St, Vancouver, BC V6G 2T8, Canada',
  },
  {
    id: 2,
    user: 'Erin McClurg',
    title: 'Large Potholes on Todd Rd.',
    category: 'Potholes',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae aperiam nesciunt libero quos nam necessitatibus ducimus iusto itaque voluptatum pariatur quis a quas, modi dolor numquam voluptates! Dignissimos, eius?',
    time: 'Mon Dec 12 2022 23:46:43 GMT+0100 (Central European Standard Time)',
    address: '1408 Todd Rd., Kamloops, BC V2C 5B5, Canada',
  },
  {
    id: 3,
    user: 'Malaki Vandas',
    title: 'Streetlight is Flickering',
    category: 'Streetlights',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae aperiam nesciunt libero quos nam necessitatibus ducimus iusto itaque voluptatum pariatur quis a quas, modi dolor numquam voluptates! Dignissimos, eius?',
    time: 'Mon Dec 12 2022 23:46:43 GMT+0100 (Central European Standard Time)',
    address: '1450 W Georgia St, Vancouver, BC V6G 2T8, Canada',
  },
];

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
  return reports.map((report) => {
    const date = new Date(report.time);
    const dateText =
      date.getDate() +
      ' ' +
      months[date.getMonth()] +
      ' ' +
      date.getFullYear();
    return (
      <Accordion key={report.id} sx={{ my: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ fontWeight: 'bold' }}>
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
        <AccordionDetails sx={{ backgroundColor: '#ededed' }}>
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
            detail={report.user}
          />
        </AccordionDetails>
      </Accordion>
    );
  });
};

export default Reports;
