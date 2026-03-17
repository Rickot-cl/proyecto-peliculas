// Configuración de las URLs de los microservicios
const API_PELICULAS = "http://localhost:5005/api/peliculas"; // Persona 1 - Leidy (Catalogo)
const API_AUTH = "http://localhost:5000/api/auth/login";     // Persona 2 - Usuarios/Roles

// 1. FUNCIÓN PARA EL CATÁLOGO (Obtener todas las películas)
export const fetchPeliculas = async () => {
    try {
        const response = await fetch(API_PELICULAS);
        return await response.json();
    } catch (error) {
        console.error("Error al traer películas:", error);
        return []; 
    }
};

// 2. FUNCIÓN PARA EL LOGIN (Verificar usuario y obtener Rol)
export const loginUsuario = async (credenciales) => {
    try {
        const response = await fetch(API_AUTH, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciales)
        });
        return await response.json(); 
    } catch (error) {
        console.error("Error en la conexión con el microservicio de usuarios:", error);
        return { rol: 'Espectador' }; 
    }
};

// 3. FUNCIÓN PARA GUARDAR (Enviar nueva película al servidor de Leidy)
export const guardarPelicula = async (nuevaPelicula) => {
    try {
        const response = await fetch(API_PELICULAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaPelicula)
        });
        return await response.json();
    } catch (error) {
        console.error("Error al guardar película:", error);
        return { error: "No se pudo conectar con el servidor de Leidy" };
    }
};