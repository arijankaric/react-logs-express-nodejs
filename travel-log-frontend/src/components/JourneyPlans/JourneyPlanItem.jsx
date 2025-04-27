import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { format } from 'date-fns';

const JourneyPlanItem = ({ plan, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{plan.name}</Typography>
          <Box>
            <Button size="small" onClick={() => onEdit(plan)}>Edit</Button>
            <Button size="small" color="error" onClick={() => onDelete(plan.id)}>
              Delete
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {format(new Date(plan.start_date), 'MMM dd, yyyy')} - {format(new Date(plan.end_date), 'MMM dd, yyyy')}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          {plan.locations && plan.locations.map((location, index) => (
            <Chip key={index} label={location} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {plan.description}
        </Typography>
        <Box>
          {plan.activities && plan.activities.map((activity, index) => (
            <Chip key={index} label={activity} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default JourneyPlanItem;