import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { format } from 'date-fns';

const TravelLogItem = ({ log, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{log.title}</Typography>
          <Box>
            <Button size="small" onClick={() => onEdit(log)}>Edit</Button>
            <Button size="small" color="error" onClick={() => onDelete(log.id)}>
              Delete
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {format(new Date(log.start_date), 'MMM dd, yyyy')} - {format(new Date(log.end_date), 'MMM dd, yyyy')}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          {log.tags && log.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        <Typography variant="body2">
          {log.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TravelLogItem;