import React, { useEffect, useState } from 'react';
import { fetchPeliculas } from '../services/api';

const Catalogo = ({ rol }) => {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetchPeliculas().then(data => setPeliculas(data));
    }, []);

    return (
        <div>
            <h2>Catálogo de Películas</h2>
            {peliculas.map((p) => (
                <div key={p._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                    <h3>{p.titulo}</h3>
                    <p>Género: {p.genero}</p>
                    
                    {/* Solo admin puede editar */}
                    {rol === 'admin' && (
                        <div>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Catalogo;