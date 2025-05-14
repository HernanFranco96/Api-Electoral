const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MunicipioSchema = new Schema({
  nombre: { type: String, required: true },
  electores: { type: Number, required: true }, // Total de electores habilitados para votar en el municipio
  partido: { type: Schema.Types.ObjectId, ref: 'Partido' }
});

module.exports = mongoose.model('Municipio', MunicipioSchema);