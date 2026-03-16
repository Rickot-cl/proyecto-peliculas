const express = require('express');
const router = express.Router();
const Pelicula = require('../models/peliculamodel');

// GET /api/peliculas
router.get('/', async (req, res) => {
    try {
        const peliculas = await Pelicula.find().limit(50);
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el catálogo", error });
    }
});

// GET /api/peliculas/:id
router.get('/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) return res.status(404).json({ mensaje: "Película no encontrada" });
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//POST /api/peliculas Solo Admin
router.post('/', async (req, res) => {
    try {
        const nuevaPelicula = new Pelicula(req.body);
        const guardado = await nuevaPelicula.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;