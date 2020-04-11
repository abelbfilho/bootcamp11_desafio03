import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      console.log(res);
      setRepositories(res.data);
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const {data: respository} = await api.post('/repositories',{
      title: `Desafio React JS ${Date.now()}}`, 
      url: "http://github.com/abelbfilho", 
      techs: ["Node.js", "React JS", "React Native", "Rubi"]
    })

    setRepositories([...repositories,respository])

  }

  async function handleRemoveRepository(id) {
    // TODO
    try {
      await api.delete(`/repositories/${id}`)
      var reps = [...repositories]; 
      var index = reps.findIndex(item => item.id === id);
      if (index !== -1) {
        reps.splice(index, 1);
        setRepositories(reps);
      }
      //
    } catch (err) {
      console.log(err);
    }
    
    console.log(id);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => 
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
