import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StaffManagement from './StaffManagement';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showManagement, setShowManagement] = useState(false);
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

  const handleStaffSelection = (staffMember) => {
    setSelectedStaff(prevSelected => {
      const isAlreadySelected = prevSelected.some(s => s._id === staffMember._id);
      if (isAlreadySelected) {
        return prevSelected.filter(s => s._id !== staffMember._id);
      } else {
        return [...prevSelected, staffMember];
      }
    });
  };

  const renderStaffList = (serviceName) => {
    const filteredStaff = staff.filter(s => {
      return (
        (typeof s.service === 'string' && s.service === serviceName) ||
        (typeof s.service === 'object' && s.service && s.service.name === serviceName) ||
        (Array.isArray(s.service) && s.service.includes(serviceName))
      );
    });
    
    return filteredStaff.map(s => (
      <div key={s._id} className="flex items-center justify-between bg-white rounded-lg shadow p-3 mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="font-medium">{s.name} {s.surname}</span>
        </div>
        <input
          type="checkbox"
          checked={selectedStaff.some(selected => selected._id === s._id)}
          onChange={() => handleStaffSelection(s)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>
    ));
  };

  const goToDeletePage = () => {
    navigate('/delete-staff'); 
  };
  
  const goToNextPage = () => {
    navigate('/ServiceShift', { state: { selectedStaff } });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Jeudi, 21 avr</h1>
        <h2 className="text-3xl font-bold mb-8">Qui travaille aujourd'hui ?</h2>
        <button className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Service
        </button>
        <button className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Administrateur
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 overflow-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-between space-x-8">
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-4">Salle</h3>
            {renderStaffList('Salle')}
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-4">Cuisine</h3>
            {renderStaffList('Cuisine')}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={goToNextPage} 
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center"
            disabled={selectedStaff.length === 0}
          >
            Suivant
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Left: "Gérer le personnel" and "Supprimer" buttons */}
<div className="fixed bottom-0 left-0 flex space-x-4 p-4">
  <button 
    onClick={() => setShowManagement(true)}
    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </button>
  
  <button 
    onClick={goToDeletePage}  // Navigate to the delete staff page
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

      {showManagement && (
        <StaffManagement 
          onClose={() => setShowManagement(false)}
          onStaffUpdate={fetchStaff}
        />
      )}
    </div>
  );
};

export default StaffList;

