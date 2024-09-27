import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateTips } from '../../services/api';

const TipCalculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedStaff, shift } = location.state || {};

  const [totalAmount, setTotalAmount] = useState('');
  const [tipPerStaff, setTipPerStaff] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedStaff || selectedStaff.length === 0) {
      setError('Aucun personnel sélectionné');
    }
  }, [selectedStaff]);

  const handleTotalAmountChange = (e) => {
    setTotalAmount(e.target.value);
  };

  const distributeEvenly = () => {
    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      setError('Veuillez entrer un montant valide');
      return;
    }

    const amountPerStaff = parseFloat(totalAmount) / selectedStaff.length;
    const newTipPerStaff = {};
    selectedStaff.forEach(staff => {
      newTipPerStaff[staff._id] = amountPerStaff.toFixed(2);
    });
    setTipPerStaff(newTipPerStaff);
    setError('');
  };

  const handleStaffTipChange = (staffId, value) => {
    setTipPerStaff(prev => ({
      ...prev,
      [staffId]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const tipResults = selectedStaff.map(staff => ({
        staffId: staff._id,
        name: `${staff.name} ${staff.surname}`,
        tip: parseFloat(tipPerStaff[staff._id] || 0),
        shift: shift,
        date: new Date().toISOString()
      }));

      await calculateTips(tipResults); // Utilisez la fonction calculateTips
      alert('Pourboires enregistrés avec succès!');
      navigate('/'); // Retour à la page d'accueil ou à une page de confirmation
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des pourboires:', error);
      setError('Erreur lors de l\'enregistrement des pourboires');
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-indigo-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Calcul des pourboires</h1>
        <h2 className="text-xl font-bold mb-4">Service: {shift}</h2>
      </div>

      <div className="flex-1 p-10">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-6">
          <label className="block mb-2">Montant total des pourboires:</label>
          <input
            type="number"
            value={totalAmount}
            onChange={handleTotalAmountChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={distributeEvenly}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-6"
        >
          Répartir équitablement
        </button>

        <div>
          <h3 className="text-xl font-semibold mb-4">Répartition des pourboires:</h3>
          {selectedStaff && selectedStaff.map(staff => (
            <div key={staff._id} className="flex items-center mb-4">
              <span className="w-1/2">{staff.name} {staff.surname}</span>
              <input
                type="number"
                value={tipPerStaff[staff._id] || ''}
                onChange={(e) => handleStaffTipChange(staff._id, e.target.value)}
                className="w-1/4 p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded mt-6"
        >
          Enregistrer les pourboires
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;





