import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Chip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, parseISO } from 'date-fns';

const JourneyPlanForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    locations: initialData.locations || [],
    // start_date: initialData.start_date || null,
    // end_date: initialData.end_date || null,
    start_date: initialData.start_date ? parseISO(initialData.start_date) : null,
    end_date: initialData.end_date ? parseISO(initialData.end_date) : null,
    activities: initialData.activities || [],
    description: initialData.description || '',
    newLocation: '',
    newActivity: ''
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        ...initialData,
        start_date: initialData.start_date ? new Date(initialData.start_date) : null,
        end_date: initialData.end_date ? new Date(initialData.end_date) : null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLocation = () => {
    if (formData.newLocation) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, prev.newLocation],
        newLocation: ''
      }));
    }
  };

  const handleAddActivity = () => {
    if (formData.newActivity) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, prev.newActivity],
        newActivity: ''
      }));
    }
  };

  const handleRemoveLocation = (index) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    console.log(format(formData.start_date, 'yyyy-MM-dd'));
    e.preventDefault();
    onSubmit({
      name: formData.name,
      locations: formData.locations,
      // start_date: formData.start_date,
      // end_date: formData.end_date,
      start_date: formData.start_date ? format(formData.start_date, 'yyyy-MM-dd') : null,
      end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : null,
      // start_date: new Date(formData.start_date).toISOString(),
      // end_date: new Date(formData.end_date).toISOString(),
      activities: formData.activities,
      description: formData.description
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Journey Plan Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Locations</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {formData.locations.map((location, index) => (
              <Chip
                key={index}
                label={location}
                onDelete={() => handleRemoveLocation(index)}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="Add Location"
              value={formData.newLocation}
              onChange={(e) => setFormData({ ...formData, newLocation: e.target.value })}
            />
            <Button variant="outlined" onClick={handleAddLocation}>
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Start Date"
            value={formData.start_date}
            onChange={(date) => setFormData({ ...formData, start_date: date })}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="End Date"
            value={formData.end_date}
            onChange={(date) => setFormData({ ...formData, end_date: date })}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Activities</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {formData.activities.map((activity, index) => (
              <Chip
                key={index}
                label={activity}
                onDelete={() => handleRemoveActivity(index)}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="Add Activity"
              value={formData.newActivity}
              onChange={(e) => setFormData({ ...formData, newActivity: e.target.value })}
            />
            <Button variant="outlined" onClick={handleAddActivity}>
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            {initialData.id ? 'Update' : 'Create'} Journey Plan
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JourneyPlanForm;