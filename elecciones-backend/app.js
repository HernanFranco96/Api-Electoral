const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const computosRoutes = require('./routes/computos');
app.use('/api/computos', computosRoutes);

const listasRoutes = require('./routes/listas');
app.use('/api/listas', listasRoutes);

const provinciasRoutes = require('./routes/provincias');
app.use('/api/provincias', provinciasRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
