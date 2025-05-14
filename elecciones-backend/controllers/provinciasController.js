const Provincia = require('../models/Provincia');
const Partido = require('../models/Partido');
const Municipio = require('../models/Municipio');

exports.crearProvinciaConPartidosYMunicipios = async (req, res) => {
  try {
    const { nombre, electores, partidos } = req.body;

    // Crear la provincia
    const provincia = new Provincia({
      nombre,
      electores // Agregar el total de electores habilitados
    });
    await provincia.save();

    for (const partidoData of partidos) {
      // Crear cada partido con referencia a la provincia
      const partido = new Partido({
        nombre: partidoData.nombre,
        electores: partidoData.electores, // Agregar electores por partido
        provincia: provincia._id
      });
      await partido.save();

      for (const municipioData of partidoData.municipios) {
        // Crear cada municipio con referencia al partido
        const municipio = new Municipio({
          nombre: municipioData.nombre,
          electores: municipioData.electores, // Agregar electores por municipio
          partido: partido._id
        });
        await municipio.save();
      }
    }

    res.status(201).json({ message: 'Provincia, partidos y municipios creados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
};