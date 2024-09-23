import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ServiceShift = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shift, setShift] = useState('midi');
  const selectedStaff = location.state?.selectedStaff || [];

  const handleShiftChange = (newShift) => {
    setShift(newShift);
  };

  const goToTipCalculator = () => {
    navigate('/TipCalculator', { state: { selectedStaff, shift } });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Jeudi, 21 avr</h1>
        <h2 className="text-3xl font-bold mb-8">Récapitulatif du service</h2>
        <button className="flex items-center mb-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Service
        </button>
        <button className="flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Administrateur
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-6">Verifier les employés selectionnés pour le :</h2>
        <p className="text-lg mb-8">jeudi 21 avril</p>

        <div className="flex mb-8">
          <button className="mr-4 px-4 py-2 bg-gray-200 rounded-full">salle / cuisine</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full">service</button>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Service</h3>
          <div className="flex items-center bg-gray-200 rounded-full w-24 p-1">
            <button
              className={`w-1/2 rounded-full p-1 ${shift === 'midi' ? 'bg-white' : ''}`}
              onClick={() => handleShiftChange('midi')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <button
              className={`w-1/2 rounded-full p-1 ${shift === 'soir' ? 'bg-white' : ''}`}
              onClick={() => handleShiftChange('soir')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-lg font-medium">{shift === 'midi' ? 'Midi' : 'Soir'}</p>
        </div>

        <div className="mb-8">
          {selectedStaff.map(staff => (
            <div key={staff._id} className="flex items-center mb-2">
              <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium">{staff.name} {staff.surname}</span>
              <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full text-sm">{staff.service}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={goToTipCalculator} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300"
        >
          Commencer le service !
        </button>
      </div>
    </div>
  );
};

export default ServiceShift;