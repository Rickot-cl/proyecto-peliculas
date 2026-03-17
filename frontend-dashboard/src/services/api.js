import axios from 'axios';

// Usamos process.env para que el puerto no esté escrito a fuego en el código
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchPeliculas = async () => {
    try {
        const response = await axios.get(`${API_URL}/peliculas`);
        return response.data;
    } catch (error) {
        console.error("Error al conectar con el microservicio:", error);
        return [];
    }
};