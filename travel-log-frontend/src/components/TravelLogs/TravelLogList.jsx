import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import TravelLogForm from './TravelLogForm';
import TravelLogItem from './TravelLogItem';
import { useAuth } from '../../context/AuthContext';
import { getTravelLogs, createTravelLog, updateTravelLog, deleteTravelLog } from '../../services/travelLogs';

const TravelLogList = () => {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getTravelLogs(token);
      setLogs(data);
    } catch (error) {
      console.error('Error fetching travel logs:', error);
    }
  };

  const handleCreate = async (logData) => {
    try {
      await createTravelLog(logData, token);
      fetchLogs();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating travel log:', error);
    }
  };

  const handleUpdate = async (logData) => {
    try {
      await updateTravelLog(editingLog.id, logData, token);
      fetchLogs();
      setEditingLog(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating travel log:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTravelLog(id, token);
      fetchLogs();
    } catch (error) {
      console.error('Error deleting travel log:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Travel Logs</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingLog(null);
            setShowForm(true);
          }}
        >
          Add New Log
        </Button>
      </Box>

      {showForm && (
        <TravelLogForm
          initialData={editingLog || {}}
          onSubmit={editingLog ? handleUpdate : handleCreate}
          onCancel={() => {
            setEditingLog(null);
            setShowForm(false);
          }}
        />
      )}

      {logs.map((log) => (
        <TravelLogItem
          key={log.id}
          log={log}
          onEdit={() => {
            setEditingLog(log);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default TravelLogList;