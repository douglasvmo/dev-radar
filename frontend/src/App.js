import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './app.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loandDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loandDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong> Cadastrar Dev</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
