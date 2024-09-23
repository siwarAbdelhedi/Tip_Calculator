import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const StaffDelete = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/staff', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError('Erreur lors de la récupération du personnel');
    }
  };

  const deleteStaff = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After deletion, fetch the updated staff list
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
      setError('Erreur lors de la suppression du personnel');
    }
  };

  const handleRedirect = () => {
    navigate('/StaffList');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Supprimer un membre du personnel</h1>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-all duration-200 mb-4"
        onClick={handleRedirect}
      >
        Gérer le personnel
      </button>
      <ul>
        {staff.map(s => (
          <li key={s._id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4 hover:bg-gray-100 transition-all duration-200">
            <div className="text-lg font-medium text-gray-700">{s.name} {s.surname}</div>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300 transition-all duration-200"
              onClick={() => deleteStaff(s._id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffDelete;
