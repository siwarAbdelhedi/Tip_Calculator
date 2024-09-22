import React from 'react';

import { createContext, useState } from 'react';
import { loginAdmin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (credentials) => {
    try {
      const { data } = await loginAdmin(credentials.username, credentials.password); 
      const token = data.token;
      localStorage.setItem('token', token);
      setAuth(token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
