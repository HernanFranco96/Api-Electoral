const Lista = require('../models/Lista');
const Provincia = require('../models/Provincia');
const Partido = require('../models/Partido');
const Municipio = require('../models/Municipio');

exports.crearLista = async (req, res) => {
  try {
    const { numero, nombre, provincia, partido, municipio, candidatos } = req.body;

    // Buscar la provincia
    const provinciaDoc = await Provincia.findOne({ nombre: provincia });
    if (!provinciaDoc) {
      return res.status(400).json({ error: 'Provincia no encontrada' });
    }

    // Buscar el partido dentro de la provincia
    const partidoDoc = await Partido.findOne({ nombre: partido, provincia: provinciaDoc._id });
    if (!partidoDoc) {
      return res.status(400).json({ error: 'Partido no encontrado en la provincia especificada' });
    }

    // Buscar el municipio dentro del partido
    const municipioDoc = await Municipio.findOne({ nombre: municipio, partido: partidoDoc._id });
    if (!municipioDoc) {
      return res.status(400).json({ error: 'Municipio no encontrado en el partido especificado' });
    }

    // Crear la lista con los datos correspondientes
    const nuevaLista = new Lista({
      numero,
      nombre,
      distrito: municipioDoc._id, // Guardamos el municipio como distrito
      municipio: municipioDoc._id, // Aseguramos que el municipio se guarde correctamente
      candidatos
    });

    await nuevaLista.save();
    res.status(201).json(nuevaLista);
  } catch (error) {
    console.error('Error al crear la lista:', error);
    res.status(500).json({ error: 'Error al crear la lista' });
  }
};



exports.obtenerListas = async (req, res) => {
  try {
    const listas = await Lista.find().populate('distrito', 'nombre'); // solo traemos el campo "nombre" del distrito
    res.json(listas);
  } catch (error) {
    console.error('Error al obtener las listas:', error);
    res.status(500).json({ error: 'Error al obtener las listas' });
  }
};

