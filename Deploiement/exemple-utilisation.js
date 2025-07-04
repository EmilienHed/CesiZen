// src/services/api.js
// Exemple d'utilisation des variables d'environnement dans une application React

// Récupération des variables d'environnement depuis env.js
const API_URL = window.ENV?.API_URL || '/api';
const HOMEPAGE = window.ENV?.HOMEPAGE || '/';
const PUBLIC_URL = window.ENV?.PUBLIC_URL || '/';
const ENV = window.ENV?.ENV || 'production';

// Configuration Axios pour l'API
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exemple de fonction utilisant l'API
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
};

// Export des configurations
export const config = {
  API_URL,
  HOMEPAGE,
  PUBLIC_URL,
  ENV,
  // Autres configurations basées sur l'environnement
  isDev: ENV === 'development',
  isProd: ENV === 'production',
  appPath: ENV === 'development' ? '/emilien-dev' : '/emilien-prod',
};

// Exemple d'utilisation dans un composant React:
/*
import React, { useEffect, useState } from 'react';
import { getUsers, config } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>CesiZen - {config.ENV}</h1>
      <p>API URL: {config.API_URL}</p>
      <p>Homepage: {config.HOMEPAGE}</p>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
*/ 