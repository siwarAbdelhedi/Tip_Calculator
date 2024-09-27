import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});


// export const registerAdmin = (credentials) => {
//   return api.post('/auth/register', credentials); // Register endpoint, if needed
// };


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

export const calculateTips = async (tips) => {
  return await api.post('/tips', { tips });  // Envoi à /api/tips
};

