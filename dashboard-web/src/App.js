import React, { useState } from 'react';
import Catalogo from './components/Catalogo';

function App() {
  // Aquí guardaremos si el usuario es 'Admin' o 'Espectador'
  const [userRole, setUserRole] = useState('Espectador'); 

  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Dashboard de Películas</h1>
        <p>Rol actual: <strong>{userRole}</strong></p>
        {/* Botón temporal para que pruebes la lógica tú mismo */}
        <button onClick={() => setUserRole(userRole === 'Admin' ? 'Espectador' : 'Admin')}>
          Cambiar Rol (Simular Login)
        </button>
      </header>
      
      <main>
        <Catalogo rol={userRole} />
      </main>
    </div>
  );
}

export default App;