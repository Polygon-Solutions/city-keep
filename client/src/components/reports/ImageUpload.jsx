import React from 'react';

import { ButtonBase, Grid, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import WorkInProgress from '../dev/WorkInProgress';

/**
 * *
 * ImageUpload Component
 * @description
    - Renders a large button to upload an image
    - Renders a WorkInProgress tooltip since the image 
      upload is not yet functional (15-05-2023)
 * TODO: Add functionality to upload an image
 * @listens ReportForm
 */
const ImageUpload = () => {
  // Return
  return (
    <WorkInProgress placement="bottom">
      <ButtonBase
        sx={[
          {
            height: 80,
            width: '80%',
            mx: 'auto',
            my: 2,
            display: 'block',
            backgroundColor: '#606060',
            borderRadius: '6px',
          },
          {
            '&:hover': {
              zIndex: 1,
              backgroundColor: '#474747',
            },
          },
        ]}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
          sx={{ p: 1 }}
        >
          <Grid item>
            <Typography color="white" textTransform="uppercase">
              Upload Images
            </Typography>
          </Grid>
          <Grid item>
            <UploadIcon sx={{ color: 'white' }} />
          </Grid>
        </Grid>
      </ButtonBase>
    </WorkInProgress>
  );
};

export default ImageUpload;
