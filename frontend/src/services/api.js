import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const loginAdmin = async (username, password) => {
  return await axios.post('http://localhost:3000/api/auth/login', { username, password });
};

export const getStaff = async () => {
  try {
    const response = await api.get('/staff'); 
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du personnel:', error);
    throw error; 
  }
};

export const getTips = async () => {
  const response = await axios.get(`${api}/tips`);
  return response.data;
};

export const deleteTip = async (tipId) => {
  await axios.delete(`${api}/tips/${tipId}`);
};

// export const registerAdmin = (credentials) => {
//   return api.post('/auth/register', credentials); // Register endpoint, if needed
// };
