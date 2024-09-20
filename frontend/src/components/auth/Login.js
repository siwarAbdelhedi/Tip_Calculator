import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer le hook useNavigate
import AuthContext from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialiser useNavigate pour rediriger

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      alert('Login successful');
      navigate('/staffList');  // Rediriger vers la page Staff après connexion réussie
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
