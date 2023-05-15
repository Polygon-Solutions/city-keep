import React from 'react';

import formatDate from '../../utils/formatDate';

import ReportDetail from './ReportDetail';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Report = ({
  report: {
    reportTime,
    title,
    category,
    description,
    address,
    firstName,
    lastName,
  },
}) => {
  const name = `${firstName} ${lastName}`;
  const date = new Date(reportTime);
  const dateText = formatDate(date);
  return (
    <Accordion sx={{ my: 1 }}>
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
            {title}
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
        <ReportDetail label={'Category'} detail={category} />
        <ReportDetail
          label={'Description'}
          detail={description}
        />
        <ReportDetail label={'Address'} detail={address} />
        <ReportDetail label={'Submitted by'} detail={name} />
      </AccordionDetails>
    </Accordion>
  );
};

export default Report;
