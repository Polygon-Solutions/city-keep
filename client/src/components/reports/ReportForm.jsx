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

const ReportForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const { submitReport } = useContext(ReportsContext);
  const { user } = useContext(AccountContext);
  const { setAlert } = useContext(AlertsContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const report = await submitReport(
        user.id,
        title,
        category,
        description,
        address
      );

      clearForm();

      setAlert(
        `Report "${report.title}" submitted successfully. Please refresh the reports page.`,
        'success'
      );
    } catch (err) {
      setAlert(err.message, 'error');
    }
  };

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setAddress('');
  };

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      justifyContent="space-between"
      rowSpacing={3}
      sx={{ px: 3, pt: 3 }}
      as="form"
      onSubmit={handleSubmit}
    >
      <Grid item>
        <Typography variant="h2">Submit a Report</Typography>
        <ReportFormField
          sx={{ my: 1 }}
          label="Title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            {categoryOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ReportFormField
          multiline
          rows={4}
          sx={{ my: 1 }}
          label="Description"
          name="description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />
        <ReportFormField
          sx={{ my: 1 }}
          label="Address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
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
            onClick={clearForm}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportForm;
