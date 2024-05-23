const mongoose = require('mongoose');
//definir el esquema
const vehiculoSchema = new mongoose.Schema({
    marca:String,
    modelo:String,
    color:String,
    placa:String,
    usuario:{ type:mongoose.Schema.Types.ObjectId,ref: 'Usuario'}
});

const VehiculoModel = mongoose.model('Vehiculo',vehiculoSchema,'vehiculo');
module.exports = VehiculoModel;
