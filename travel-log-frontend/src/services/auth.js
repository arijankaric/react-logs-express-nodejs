import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

const register = async (username, password, email, address) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    password,
    email,
    address
  });
  return response.data;
};

export { login, register };