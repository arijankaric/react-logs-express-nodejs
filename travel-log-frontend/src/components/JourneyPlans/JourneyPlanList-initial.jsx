import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import JourneyPlanItem from './JourneyPlanItem';
import JourneyPlanForm from './JourneyPlanForm';
import { useAuth } from '../../context/AuthContext';
import { getJourneyPlans, createJourneyPlan, updateJourneyPlan, deleteJourneyPlan } from '../../services/journeyPlans';

const JourneyPlanList = () => {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  React.useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getJourneyPlans(token);
      setPlans(data);
    } catch (error) {
      console.error('Error fetching journey plans:', error);
    }
  };

  const handleCreate = async (planData) => {
    try {
      await createJourneyPlan(planData, token);
      fetchPlans();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating journey plan:', error);
    }
  };

  const handleUpdate = async (planData) => {
    try {
      await updateJourneyPlan(editingPlan.id, planData, token);
      fetchPlans();
      setEditingPlan(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating journey plan:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJourneyPlan(id, token);
      fetchPlans();
    } catch (error) {
      console.error('Error deleting journey plan:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Journey Plans</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingPlan(null);
            setShowForm(true);
          }}
        >
          Add New Plan
        </Button>
      </Box>

      {showForm && (
        <JourneyPlanForm
          initialData={editingPlan || {}}
          onSubmit={editingPlan ? handleUpdate : handleCreate}
        />
      )}

      {plans.map((plan) => (
        <JourneyPlanItem
          key={plan.id}
          plan={plan}
          onEdit={(plan) => {
            setEditingPlan(plan);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default JourneyPlanList;