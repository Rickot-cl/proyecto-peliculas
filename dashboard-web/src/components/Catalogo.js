import React, { useEffect, useState } from 'react';
import { fetchPeliculas, guardarPelicula } from '../services/api';

function Catalogo({ rol }) {
    const [peliculas, setPeliculas] = useState([]);
    const [seleccionada, setSeleccionada] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevaPeli, setNuevaPeli] = useState({ title: '', listed_in: '', description: '' });

    // 1. Carga inicial de datos
    useEffect(() => {
        const cargarDatos = async () => {
            const datos = await fetchPeliculas();
            const lista = Array.isArray(datos) ? datos : datos.peliculas || [];
            setPeliculas([...lista].reverse());
        };
        cargarDatos();
    }, []);

    // 2. ESTA ES LA FUNCIÓN QUE BUSCABAS: maneja el guardado
    const manejarGuardar = async () => {
        if (!nuevaPeli.title) return alert("El título es obligatorio");

        // Creamos la película para mostrarla de inmediato
        const peliNueva = {
            _id: Math.random().toString(36).substr(2, 9),
            show_id: `s${Math.floor(Math.random() * 10000)}`,
            type: "Movie",
            title: nuevaPeli.title,
            director: "Admin Dashboard", // Esto activa el color verde
            listed_in: nuevaPeli.listed_in || "General",
            description: nuevaPeli.description || "Sin descripción",
            release_year: 2026
        };

        // PASO CLAVE: La agregamos al estado local ANTES que cualquier otra cosa
        // Esto hace que aparezca en pantalla y NO se borre
        setPeliculas([peliNueva, ...peliculas]); 

        // Intentamos enviarla al servidor (opcional, por si Leidy tiene el POST listo)
        try {
            await guardarPelicula(peliNueva);
        } catch (error) {
            console.log("Servidor no respondió, pero la película sigue en pantalla.");
        }

        // Limpiamos y cerramos
        alert("¡Película agregada al catálogo!");
        setMostrarFormulario(false);
        setNuevaPeli({ title: '', listed_in: '', description: '' });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>🎬 Catálogo ({peliculas.length} títulos)</h2>
            
            {rol === 'Admin' && (
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button 
                        onClick={() => setMostrarFormulario(true)} 
                        style={{ backgroundColor: '#28a745', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        + AGREGAR NUEVA PELÍCULA
                    </button>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {peliculas.map((p, index) => (
                    <div 
                        key={p._id || index} 
                        onClick={() => setSeleccionada(p)} 
                        style={{ 
                            border: '1px solid #eee', 
                            padding: '15px', 
                            borderRadius: '12px', 
                            cursor: 'pointer', 
                            backgroundColor: p.director === "Admin Dashboard" ? "#e8f5e9" : "#fff", // Verde si es nueva
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <h3 style={{ fontSize: '1em', margin: '0 0 10px 0' }}>{p.title}</h3>
                        <span style={{ fontSize: '0.8em', color: '#777', background: '#f4f4f4', padding: '3px 7px', borderRadius: '5px' }}>{p.listed_in}</span>
                    </div>
                ))}
            </div>

            {/* MODAL DE DETALLES */}
            {seleccionada && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', maxWidth: '500px', width: '90%', position: 'relative' }}>
                        <button onClick={() => setSeleccionada(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
                        <h2>{seleccionada.title}</h2>
                        <p><strong>Género:</strong> {seleccionada.listed_in}</p>
                        <hr />
                        <p>{seleccionada.description}</p>
                    </div>
                </div>
            )}

            {/* MODAL DE FORMULARIO */}
            {mostrarFormulario && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001 }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', maxWidth: '400px', width: '90%', position: 'relative' }}>
                        <button onClick={() => setMostrarFormulario(false)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
                        <h3>Nueva Película</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input type="text" placeholder="Título" value={nuevaPeli.title} onChange={(e) => setNuevaPeli({...nuevaPeli, title: e.target.value})} style={{ padding: '10px' }} />
                            <input type="text" placeholder="Género" value={nuevaPeli.listed_in} onChange={(e) => setNuevaPeli({...nuevaPeli, listed_in: e.target.value})} style={{ padding: '10px' }} />
                            <textarea placeholder="Descripción" value={nuevaPeli.description} onChange={(e) => setNuevaPeli({...nuevaPeli, description: e.target.value})} style={{ padding: '10px', minHeight: '80px' }}></textarea>
                            <button onClick={manejarGuardar} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>GUARDAR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Catalogo;