import React, { useEffect, useState } from "react";

import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }

    loadRepositories();
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title: `Repositorio ${Date.now()}`,
      url: 'https://github.com/nelsonplinio',
      techs: ['React', 'Node.js', 'React Native']
    })
    
    setRepositories([
      ...repositories,
      response.data,
    ])
  }

  async function handleRemoveRepository(id) {
   
    await api.delete(`/repositories/${id}`);
    
    const repos = repositories.filter(repo => repo.id !== id);
    
    setRepositories(
      repos
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
