const mongoose = require('mongoose');

const ComputoSchema = new mongoose.Schema({
  distrito: { type: mongoose.Schema.Types.ObjectId, ref: 'Distrito', required: true },
  anio: { type: Number, required: true },
  resultados: [
    {
      lista: { type: mongoose.Schema.Types.ObjectId, ref: 'Lista', required: true },
      votos: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Computo', ComputoSchema);
