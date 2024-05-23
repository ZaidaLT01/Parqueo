const express = require('express');
const rutas = express.Router();
const VehiculoModel = require('../models/Vehiculo');
const UsuarioModel = require('../models/Usuario');

//endpoint para traer todas las recetas
rutas.get('/traerVehiculos',async(req,res)=>{
    try{
        const vehiculo= await VehiculoModel.find();
        res.json(vehiculo);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});
module.exports=rutas;

//endpoint 2 Crear
rutas.post('/crear',async(req,res)=>{
    const vehiculo=new VehiculoModel({
        marca: req.body.marca,
        modelo: req.body.modelo,
        color: req.body.color,
        placa: req.body.placa,
        usuario:req.body.usuario //asignar el id del usuario
        /*
        debido a que ingresamos sesion solo se guarda el ususario del que inicio sesion, a menos que se cambie la autenticacion, o token con el que queramos ingresas a la funcion crear
        debido a eso en este metodo se puede crear utilizando el id del cuerpo de postman dado, este anterior sirve mucho para lo que es controles de administracion o solo gerente y demas
        usuario:req.usuario._id */
    })
    console.log(vehiculo);
    try{
        const nuevoVehiculo= await vehiculo.save();
        res.status(201).json(nuevoVehiculo);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});
//endpoint 3 Editar
rutas.put('/editar/:id',async(req,res)=>{

    try{
        const vehiculoEditado= await VehiculoModel.findByIdAndUpdate(req.params.id, req.body, {new :true});
        if(!vehiculoEditado)
            return res.status(404).json({mensaje:"Vehiculo no o"});
        else
            return res.status(201).json(vehiculoEditado);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});
//endpoint 4 Eliminar
rutas.delete('/eliminar/:id',async(req,res)=>{

    try{
        const vehiculoEliminado = await VehiculoModel.findByIdAndDelete(req.params.id) ;
        if(!vehiculoEliminado)
            return res.status(404).json({mensaje:"Vehiculo no Encontrado"});
        else
            return res.json({mensaje: 'Vehiculo Eliminado'});
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});

//Consulta 1 obtener un Vehiculo por su ID
rutas.get('/vehiculoObt/:id', async (req, res) => {
    try {
        const vehiculo = await VehiculoModel.findById(req.params.id);
        if (!vehiculo)
            return res.status(404).json({ mensaje : 'Vehiculo no encontrad0!!!'});
        else 
            return res.json(vehiculo);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//Consulta 2 eliminar todos los vehiculos
rutas.delete('/eliminarTodos', async (req, res) => {
    try {
        await RecetaModel.deleteMany({ });
        return res.json({mensaje: "Todas los Vehiculos han sido eliminadas"});
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//Consulta 3 contar el numero total de Vehiculos
rutas.get('/totalVehiculos', async (req, res) => {
    try {
        const total = await VehiculoModel.countDocuments();
        return res.json({totalReceta: total });
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
//Consulta 4 obtener Vehiculos ordenadas por nombre ascendente
// query.sort({ field: 'asc', test: -1 });
rutas.get('/ordenarVehiculos', async (req, res) => {
    try {
       const vehiculosOrdenados = await VehiculoModel.find().sort({ nombre: 1});
       res.status(200).json(vehiculosOrdenados);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//--------------------REPORTES
//REPORTES 1
rutas.get('/vehiculoPorUsuario/:usuarioid', async (peticion, res) =>{
    const {usuarioid} = peticion.params;
    try{
        const usuario = await UsuarioModel.findById(usuarioid);
        if(!usuario)
            return res.status(404).json({mensaje: 'usuario no encontrado'});
        const vehiculo = await VehiculoModel.find({usuario:usuarioid}).populate('usuario');
        res.json(vehiculo);

    }catch(error){
        res.status(500).json({ mensaje :  error.message})
    }
});

module.exports=rutas;
