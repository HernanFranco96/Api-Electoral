const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidoSchema = new Schema({
  nombre: { type: String, required: true },
  electores: { type: Number, required: true }, // Total de electores habilitados para votar en el partido
  provincia: { type: Schema.Types.ObjectId, ref: 'Provincia' },
  municipios: [{ type: Schema.Types.ObjectId, ref: 'Municipio' }]
});

module.exports = mongoose.model('Partido', PartidoSchema);