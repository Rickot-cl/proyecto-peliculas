import React, { useState } from 'react';
import Catalogo from './components/Catalogo'; // Importando con el nuevo nombre

function App() {
  const [rol] = useState('admin'); // Aquí puedes cambiar a 'espectador' para probar

  return (
    <div>
      <h1>Dashboard Administrativo</h1>
      <Catalogo rol={rol} />
    </div>
  );
}

export default App;