require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const peliculaRoutes = require('./routes/peliculashandler');
const Pelicula = require('./models/peliculamodel');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

app.use('/api/peliculas', peliculaRoutes);

app.get('/probar-datos', async (req, res) => {
    try {
        const unaPelicula = await Pelicula.findOne();
        res.json({
            mensaje: "Conexión real establecida",
            dato: unaPelicula
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));