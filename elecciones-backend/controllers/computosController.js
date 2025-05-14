const Computo = require('../models/Computo').default;
const Lista = require('../models/Lista');

exports.crearComputo = async (req, res) => {
  try {
    const nuevoComputo = new Computo(req.body);
    await nuevoComputo.save();
    res.status(201).json(nuevoComputo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar cómputo', error });
  }
};

// Obtener cómputos, con filtro opcional por año
exports.obtenerResultadosPorDistritoYAnio = async (req, res) => {
  try {
    const { distrito, anio } = req.query;

    const resultados = await Computo.aggregate([
      { $match: { distrito: distrito, anio: parseInt(anio) } },
      {
        $group: {
          _id: "$lista",
          votos: { $sum: "$votos" }
        }
      },
      {
        $lookup: {
          from: "listas",
          localField: "_id",
          foreignField: "_id",
          as: "lista"
        }
      },
      { $unwind: "$lista" },
      { $sort: { votos: -1 } }
    ]);

    res.json({ resultados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los resultados' });
  }
};

