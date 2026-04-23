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

router.post('/', (req, res) => {
    const nuevo = { id: habilidades.length + 1, ...req.body };
    habilidades.push(nuevo);
    res.status(201).json(nuevo);
});

// PUT /api/habilidades/:id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const habilidad = habilidades.find(p => p.id === id);
    if (!habilidad) {
        return res.status(404).json({ error: 'Habilidad no encontrada' });
    }
    Object.assign(habilidad, req.body);
    res.status(200).json(habilidad);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const habilidad = habilidades.findIndex(p => p.id === id);
    if (habilidad === -1) {
        return res.status(404).json({ error: 'Habilidad no encontrada' });
    }
    habilidades.splice(habilidad, 1)
    res.status(204).send()
})

module.exports = router;