const express = require('express');
const router = express.Router();
const listasController = require('../controllers/listasController');

router.post('/', listasController.crearLista);
router.get('/', listasController.obtenerListas);

module.exports = router;
