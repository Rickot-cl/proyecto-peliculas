require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const Pelicula = require('./models/peliculamodel');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta de prueba para ver si los datos fluyen
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));