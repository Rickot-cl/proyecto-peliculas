import React, { useState } from 'react';
import Catalogo from './components/Catalogo';

function App() {
  // El rol inicial es Espectador
  const [rol, setRol] = useState('Espectador');

  // Función para cambiar entre Admin y Espectador
  const cambiarRol = () => {
    setRol(rol === 'Espectador' ? 'Admin' : 'Espectador');
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* BARRA DE NAVEGACIÓN SIMPLE */}
      <header style={{ 
        backgroundColor: '#343a40', 
        color: 'white', 
        padding: '15px', 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)' 
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5em' }}>Dashboard de Películas</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '0.9em', background: '#495057', padding: '5px 10px', borderRadius: '15px' }}>
            Usuario: <strong>{rol}</strong>
          </span>
          
          {/* BOTÓN CORREGIDO: Solo dice "Cambiar Rol" */}
          <button 
            onClick={cambiarRol}
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cambiar Rol
          </button>
        </div>
      </header>

      {/* COMPONENTE PRINCIPAL */}
      <main>
        <Catalogo rol={rol} />
      </main>

      <footer style={{ marginTop: '40px', paddingBottom: '20px', color: '#888', fontSize: '0.8em' }}>
        &copy; 2026 - Integración de Microservicios (Persona 1 y Persona 2)
      </footer>
    </div>
  );
}

export default App;