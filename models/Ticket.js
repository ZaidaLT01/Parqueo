const mongoose = require('mongoose');
//definir el esquema
const ticketSchema = new mongoose.Schema({
    Fentrada:Date,
    Fsalida:Date,
    Monto:Number,
    Estado:String,
    usuario:{ type:mongoose.Schema.Types.ObjectId,ref: 'Usuario'},
    vehiculo:{ type:mongoose.Schema.Types.ObjectId,ref: 'Vehiculo'}
});

const TicketModel = mongoose.model('Ticket',ticketSchema,'ticket');
module.exports = TicketModel;