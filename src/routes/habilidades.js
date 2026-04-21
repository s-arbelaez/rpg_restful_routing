const express = require('express');
const { personajes, habilidades } = require('../data/datosJuego');

const router = express.Router();

// GET /api/habilidades?orden=estamina
router.get('/', (req, res) => {
    const { orden } = req.query;
    let resultado = [...habilidades];
    if (orden === 'estamina') {
        resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
    }
    res.status(200).json(resultado);
});

// GET /api/habilidades/:id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const habilidad = habilidades.find(p => p.id === id);
    if (!habilidad) {
        return res.status(404).json({ error: 'Habilidad no encontrada' });
    }
    res.status(200).json(habilidad);
});

// POST /api/personajes
router.post('/', (req, res) => {
    const nuevo = { id: personajes.length + 1, ...req.body };
    personajes.push(nuevo);
    res.status(201).json(nuevo);
});

// GET /api/habilidades/:id/habilidades — ruta jerárquica
router.get('/:id/habilidades', (req, res) => {
    const id = Number(req.params.id);
    const personaje = personajes.find(p => p.id === id);
    if (!personaje) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    const suyas = habilidades.filter(h => personaje.habilidades.includes(h.id));
    res.status(200).json(suyas);
});

module.exports = router;