import React, { useState, useContext } from 'react';

import ReportsContext from '../../context/reports/ReportsContext';
import AccountContext from '../../context/account/AccountContext';
import AlertsContext from '../../context/alerts/AlertsContext';

import ReportFormField from './ReportFormField';

import ImageUpload from './ImageUpload';
import { categoryOptions } from '../../utils/categoryOptions';

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';

/**
 * *
 * ReportForm Component
 * @description
    - Renders a form for submitting a reports with text 
      fields for title, description, and address, a select 
      menu for category, and an image upload field
    - Renders a button to submit the report and another to 
      clear the form
 * @listens ReportFormPopover
 * @fires ReportsContext.submitReport
 */
const ReportForm = () => {
  // State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    address: '',
  });

  const { title, category, description, address } = formData;

  // State Handlers
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      address: '',
    });
  };

  // Context
  const { submitReport } = useContext(ReportsContext);
  const { user } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  /** 
   * *
   * Handle Submit Report
   * @description 
      - Attempts to submit the report to the database
      - Displays a success alert if successful
      - Displays an error alert if unsuccessful
   * @listens Grid (form) submission
   * @fires ReportsContext.submitReport
   * @fires handleClearForm
   */
  const handleSubmitReport = async (event) => {
    event.preventDefault();

    try {
      const report = await submitReport(
        user.id,
        title,
        category,
        description,
        address
      );

      handleClearForm();

      setAlert(
        `Report "${report.title}" submitted successfully. Please refresh the reports page.`,
        'success'
      );
    } catch (err) {
      setAlert(err.message, 'error');
    }
  };

  // Render
  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      justifyContent="space-between"
      rowSpacing={3}
      sx={{ px: 3, pt: 3 }}
      as="form"
      onSubmit={handleSubmitReport}
    >
      <Grid item>
        <Typography variant="h2">Submit a Report</Typography>
        <ReportFormField
          sx={{ my: 1 }}
          label="Title"
          name="title"
          value={title}
          onChange={handleFormChange}
        />
        <FormControl
          required
          size="small"
          sx={{ my: 1, width: '100%' }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            MenuProps={{ sx: { maxHeight: '200px' } }}
            label="Category"
            name="category"
            value={category}
            onChange={handleFormChange}
          >
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            {
              // Maps the static categoryOptions array to MenuItem components
              categoryOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <ReportFormField
          multiline
          rows={4}
          sx={{ my: 1 }}
          label="Description"
          name="description"
          value={description}
          onChange={handleFormChange}
        />
        <ReportFormField
          sx={{ my: 1 }}
          label="Address"
          name="address"
          value={address}
          onChange={handleFormChange}
        />
        <ImageUpload />
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        columnSpacing={4}
        sx={{ pb: 3 }}
      >
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ width: 1 }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            type="reset"
            sx={{ width: 1 }}
            onClick={handleClearForm}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportForm;
