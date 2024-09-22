import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/staffList');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-800 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-navy-blue">Bienvenue,</h2>
        <p className="text-center text-gray-600 mb-8">Sur la web app pour gérer au mieux vos pourboires</p>
        
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img src="assests/images/logo.png" alt="Logo" className="w-16 h-16" /> {/* Remplacez par le chemin de votre logo */}
        </div>
        
        <h3 className="text-xl font-bold mb-6 text-center text-navy-blue">INDY</h3>
        <p className="text-center text-gray-600 mb-8">RESTAURANT</p>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 border-indigo-700 bg-blue-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-blue-800 font-semibold"
          >
            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;