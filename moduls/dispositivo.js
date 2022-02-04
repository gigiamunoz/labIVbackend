const mongoose = require('mongoose');
const { Schema } = mongoose;

const dispositivoSchema = new Schema({
  nombre:  String,
  variable: String,
  latitud:   String,
  longitud: String,
  date: { type: Date, default: Date.now },
});

const Dispositivo = mongoose.model('Dispositivo',dispositivoSchema);
module.exports = Dispositivo; 