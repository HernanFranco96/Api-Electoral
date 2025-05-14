const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProvinciaSchema = new Schema({
  nombre: { type: String, required: true },
  electores: { type: Number, required: true }, // Total de electores habilitados para votar en la provincia
  partidos: [{ type: Schema.Types.ObjectId, ref: 'Partido' }]
});

module.exports = mongoose.model('Provincia', ProvinciaSchema);