import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const loginAdmin = async (username, password) => {
  return await axios.post('http://localhost:3000/api/auth/login', { username, password });
};

export const getStaff = async (username, password) => {
  return await axios.post('http://localhost:3000/api/auth/login', { username, password });
};

// export const registerAdmin = (credentials) => {
//   return api.post('/auth/register', credentials); // Register endpoint, if needed
// };
