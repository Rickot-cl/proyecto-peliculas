import React, { useEffect, useState } from 'react';
import { fetchPeliculas } from '../services/api';

function Catalogo({ rol }) { // <--- Recibe el rol aquí
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            const datos = await fetchPeliculas();
            setPeliculas(datos);
        };
        cargarDatos();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Catálogo de Películas</h2>
            
            {/* LÓGICA DE ROL: Solo el Admin ve este botón */}
            {rol === 'Admin' && (
                <button style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px' 
                }}>
                    + Agregar Nueva Película (Vista Admin)
                </button>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {peliculas.map(p => (
                    <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{p.titulo}</h3>
                        <p style={{ color: '#666' }}>Género: {p.genero}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;