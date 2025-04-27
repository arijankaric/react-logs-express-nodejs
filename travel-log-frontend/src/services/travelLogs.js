import axios from 'axios';

const API_URL = 'http://localhost:5000/api/travel-logs';

const getTravelLogs = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const createTravelLog = async (logData, token) => {
  const response = await axios.post(API_URL, logData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const updateTravelLog = async (id, logData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, logData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const deleteTravelLog = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export { getTravelLogs, createTravelLog, updateTravelLog, deleteTravelLog };