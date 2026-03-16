require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const peliculaRoutes = require('./routes/pelicularoute'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/peliculas', peliculaRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));
       
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));