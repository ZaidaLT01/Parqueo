const mongoose = require('mongoose');
//definir el esquema
const espacioSchema = new mongoose.Schema({
    Estado:String,
    TipoPermitico:String,
    Ubicacion:String,
    usuario:{ type:mongoose.Schema.Types.ObjectId,ref: 'Usuario'},
    vehiculo:{ type:mongoose.Schema.Types.ObjectId,ref: 'Vehiculo'}
});

const EspacioModel = mongoose.model('Espacio',espacioSchema,'espacio');
module.exports = EspacioModel;