// Configuración de las URLs de los microservicios
const API_PELICULAS = "http://localhost:5005/api/peliculas"; // Persona 1
const API_AUTH = "http://localhost:5000/api/auth/login";     // Persona 2

// 1. FUNCIÓN PARA EL CATÁLOGO (Persona 1 - Leidy)
export const fetchPeliculas = async () => {
    try {
        const response = await fetch(API_PELICULAS);
        return await response.json();
    } catch (error) {
        console.error("Error al traer películas:", error);
        return []; 
    }
};

// 2. FUNCIÓN PARA EL LOGIN (Persona 2 - Usuarios/Roles)
// Esta función cumple con el requisito de conectar al puerto 5000
export const loginUsuario = async (credenciales) => {
    try {
        const response = await fetch(API_AUTH, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciales)
        });
        return await response.json(); // Esto devolverá el Rol que usaremos en el Dashboard
    } catch (error) {
        console.error("Error en la conexión con el microservicio de usuarios:", error);
        return { rol: 'Espectador' }; 
    }
};