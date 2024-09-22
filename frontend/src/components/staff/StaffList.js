import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', surname: '', amount: '', service: '', shift: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token'); 
        // console.log('Token utilisé:', token);
        const response = await axios.get('http://localhost:3000/api/staff', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStaff(response.data); 
        // console.log('FRONT:', response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setError('Erreur lors de la récupération du personnel');
      }
    };
    fetchStaff();
  }, []);

  const handleAddStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      const staffData = {
        ...newStaff,
        service: newStaff.service 
      };
      const response = await axios.post('http://localhost:3000/api/staff', staffData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStaff([...staff, response.data]); 
      setNewStaff({ name: '', surname: '', amount: '', service: '', shift: '' }); 
      setError('');
    } catch (error) {
      console.error('Failed to add staff', error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        setError(`Erreur ${error.response.status}: ${error.response.data.message || 'Erreur inconnue'}`);
      } else if (error.request) {
        console.error(error.request);
        setError('Pas de réponse du serveur');
      } else {
        console.error('Error', error.message);
        setError(`Erreur: ${error.message}`);
      }
    }
  };

  const renderStaffList = (serviceName) => {
    // console.log('Rendering staff for service:', serviceName);
    // console.log('All staff:', staff);
    
    const filteredStaff = staff.filter(s => {
      // console.log('Checking staff member:', s);
      return (
        (typeof s.service === 'string' && s.service === serviceName) ||
        (typeof s.service === 'object' && s.service && s.service.name === serviceName) ||
        (Array.isArray(s.service) && s.service.includes(serviceName))
      );
    });
    
    console.log('Filtered staff:', filteredStaff);
    
    return filteredStaff.map(s => (
      <li key={s._id} className="mb-2">
        {s.name} {s.surname} (Service: {typeof s.service === 'string' ? s.service : s.service?.name || 'Non spécifié'})
      </li>
    ));
  };




  return (
    <div className="p-4">
    {error && <div className="text-red-500 mb-4">{error}</div>}

    <div className="flex justify-between mb-4">
      <div className="w-[48%] border rounded-lg shadow-md">
        <div className="border-b p-2 text-center font-bold">
          Personnel en Salle
        </div>
        <div className="p-4">
          <ul className="list-disc pl-5">
            {renderStaffList('Salle').length > 0 
              ? renderStaffList('Salle') 
              : <li>Aucun personnel en Salle</li>}
          </ul>
        </div>
      </div>

      <div className="w-[48%] border rounded-lg shadow-md">
        <div className="border-b p-2 text-center font-bold">
          Personnel en Cuisine
        </div>
        <div className="p-4">
          <ul className="list-disc pl-5">
            {renderStaffList('Cuisine').length > 0 
              ? renderStaffList('Cuisine') 
              : <li>Aucun personnel en Cuisine</li>}
          </ul>
        </div>
      </div>
    </div>



      <h2 className="text-xl font-semibold mt-4 mb-4">Ajouter un nouveau membre du personnel</h2>
      <input
        type="text"
        placeholder="Nom"
        value={newStaff.name}
        onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        className="border p-2 mb-2 mr-2"
      />
      <input
        type="text"
        placeholder="Prénom"
        value={newStaff.surname}
        onChange={(e) => setNewStaff({ ...newStaff, surname: e.target.value })}
        className="border p-2 mb-2 mr-2"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newStaff.amount}
        onChange={(e) => setNewStaff({ ...newStaff, amount: e.target.value })}
        className="border p-2 mb-2 mr-2"
      />
      <select
        value={newStaff.service}
        onChange={(e) => setNewStaff({ ...newStaff, service: e.target.value })}
        className="border p-2 mb-2 mr-2"
      >
        <option value="">Sélectionner un service</option>
        <option value="Salle">Salle</option>
        <option value="Cuisine">Cuisine</option>
      </select>
      <select
        value={newStaff.shift}
        onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
        className="border p-2 mb-2"
      >
        <option value="">Sélectionner un shift</option>
        <option value="day">Jour</option>
        <option value="night">Nuit</option>
      </select>
      <button onClick={handleAddStaff} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Ajouter un membre
      </button>
    </div>
  );
};

export default StaffList;