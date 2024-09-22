import { useEffect, useState } from 'react';
import { getTips, deleteTip } from '../../services/api';

const TipList = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getTips();
        setTips(response.data);
      } catch (error) {
        alert('Failed to load tips');
      }
    };
    fetchTips();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTip(id);
      setTips(tips.filter(tip => tip._id !== id));
    } catch (error) {
      alert('Failed to delete tip');
    }
  };

  return (
    <div>
      <h2>Tips</h2>
      <ul>
        {tips.map(tip => (
          <li key={tip._id}>
            {tip.amount} - {tip.date}
            <button onClick={() => handleDelete(tip._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipList;
