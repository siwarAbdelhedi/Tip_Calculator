import { useEffect, useState } from 'react';
import { getServices } from '../../services/api';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        alert('Failed to load services');
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            {service.name} - {service.shift}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
