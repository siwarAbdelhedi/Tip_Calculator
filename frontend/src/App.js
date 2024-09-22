import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import StaffList from './components/staff/StaffList';
import ServiceShift from './components/services/ServiceShift';
import TipCalculator from './components/tips/TipCalculator'

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes> 
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/staffList" element={<StaffList />} />
      <Route path="/ServiceShift" element={<ServiceShift />} />
      <Route path='/tipCalculator' element={<TipCalculator />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
