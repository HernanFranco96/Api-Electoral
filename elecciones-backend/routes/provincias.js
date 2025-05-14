const express = require('express');
const router = express.Router();
const provinciasController = require('../controllers/provinciasController');

router.post('/crear', provinciasController.crearProvinciaConPartidosYMunicipios);

module.exports = router;