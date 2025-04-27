import axios from 'axios';

const API_URL = 'http://localhost:5000/api/journey-plans';

const getJourneyPlans = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const createJourneyPlan = async (planData, token) => {
  const response = await axios.post(API_URL, planData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const updateJourneyPlan = async (id, planData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, planData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const deleteJourneyPlan = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export { getJourneyPlans, createJourneyPlan, updateJourneyPlan, deleteJourneyPlan };