import { useEffect, useState } from 'react';
import { getStaff } from '../../services/api';

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        setStaff(response.data);
      } catch (error) {
        alert('Failed to load staff');
      }
    };
    fetchStaff();
  }, []);

  return (
    <div>
      <h2>Staff</h2>
      <ul>
        {staff.map(member => (
          <li key={member._id}>
            {member.name} - {member.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
