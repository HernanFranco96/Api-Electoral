const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListaSchema = new Schema({
  numero: { type: Number, required: true },
  nombre: { type: String, required: true },
  distrito: { type: Schema.Types.ObjectId, ref: 'Municipio', required: true }, // Relación con el municipio
  candidatos: [{
    nombre: { type: String },
    cargo: { type: String }
  }],
  municipio: { type: Schema.Types.ObjectId, ref: 'Municipio' } // Asegúrate de que este campo esté presente
});

module.exports = mongoose.model('Lista', ListaSchema);
