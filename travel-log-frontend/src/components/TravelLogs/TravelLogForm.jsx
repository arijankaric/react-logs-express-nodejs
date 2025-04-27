import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Chip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, parseISO } from 'date-fns';

const TravelLogForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    // start_date: initialData.start_date || null,
    // end_date: initialData.end_date || null,
    start_date: initialData.start_date ? parseISO(initialData.start_date) : null,
    end_date: initialData.end_date ? parseISO(initialData.end_date) : null,
    tags: initialData.tags || [],
    newTag: ''
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

  const handleAddTag = () => {
    if (formData.newTag) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      // start_date: formData.start_date?.toISOString(),
      // end_date: formData.end_date?.toISOString(),
      start_date: formData.start_date ? format(formData.start_date, 'yyyy-MM-dd') : null,
      end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : null,
      tags: formData.tags
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
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
          <Typography variant="subtitle1">Tags</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(index)}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="Add Tag"
              value={formData.newTag}
              onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
            />
            <Button variant="outlined" onClick={handleAddTag}>
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
            {initialData.id ? 'Update' : 'Create'} Travel Log
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TravelLogForm;