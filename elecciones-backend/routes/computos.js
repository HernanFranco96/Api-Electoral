const express = require('express');
const router = express.Router();
const computosController = require('../controllers/computosController');

router.get('/resultados', computosController.obtenerResultadosPorDistritoYAnio);
router.post('/', computosController.crearComputo);

module.exports = router;