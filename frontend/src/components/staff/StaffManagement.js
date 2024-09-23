import React, { useState } from 'react';
import axios from 'axios';

const StaffManagement = ({ onClose, onStaffUpdate }) => {
  const [newStaff, setNewStaff] = useState({ name: '', surname: '', amount: '', service: '', shift: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      const staffData = {
        ...newStaff,
        service: newStaff.service 
      };
      await axios.post('http://localhost:3000/api/staff', staffData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setNewStaff({ name: '', surname: '', amount: '', service: '', shift: '' }); 
      setError('');
      setSuccess(true);
      onStaffUpdate();
    } catch (error) {
      console.error('Failed to add staff', error);
      setError(`Erreur: ${error.response?.data?.message || error.message || 'Erreur inconnue'}`);
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Gérer le personnel</h1>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input
            type="text"
            placeholder="Nom"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
          <input
            type="text"
            placeholder="Prénom"
            value={newStaff.surname}
            onChange={(e) => setNewStaff({ ...newStaff, surname: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Montant</label>
          <input
            type="number"
            placeholder="Montant"
            value={newStaff.amount}
            onChange={(e) => setNewStaff({ ...newStaff, amount: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
          <div className="flex justify-between">
            <button
              onClick={() => setNewStaff({ ...newStaff, service: 'Salle' })}
              className={`flex-1 p-3 mx-2 rounded-md ${newStaff.service === 'Salle' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <span role="img" aria-label="Salle">🍽️</span> Salle
            </button>
            <button
              onClick={() => setNewStaff({ ...newStaff, service: 'Cuisine' })}
              className={`flex-1 p-3 mx-2 rounded-md ${newStaff.service === 'Cuisine' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <span role="img" aria-label="Cuisine">🍳</span> Cuisine
            </button>
          </div>
        </div>

        <button
          onClick={handleAddStaff}
          className="w-full bg-indigo-500 text-white p-3 rounded-md text-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Ajouter un nouvel employé
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 p-3 rounded-md mt-4 text-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
        >
          Fermer
        </button>
      </div>


      {success && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Succès !</h2>
            <p>L'employé <strong>{newStaff.name}</strong> a été ajouté avec succès.</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default StaffManagement;