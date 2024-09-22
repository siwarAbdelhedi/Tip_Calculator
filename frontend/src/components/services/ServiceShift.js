import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ServiceShift = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shift, setShift] = useState('');
  const selectedStaff = location.state?.selectedStaff || [];

  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  const goToTipCalculator = () => {
    navigate('/TipCalculator', { state: { selectedStaff, shift } });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sélectionner le service</h2>
      <select
        value={shift}
        onChange={handleShiftChange}
        className="border p-2 mb-4"
      >
        <option value="">Sélectionner un shift</option>
        <option value="day">Jour</option>
        <option value="night">Nuit</option>
      </select>

      <h3 className="text-lg font-semibold mb-2">Personnel sélectionné:</h3>
      <ul className="list-disc pl-5 mb-4">
        {selectedStaff.map(staff => (
          <li key={staff._id}>{staff.name} {staff.surname} ({staff.service})</li>
        ))}
      </ul>

      <button 
        onClick={goToTipCalculator} 
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        disabled={!shift}
      >
        Calculer les pourboires
      </button>
    </div>
  );
};

export default ServiceShift;