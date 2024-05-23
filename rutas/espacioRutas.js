const express = require('express');
const rutas = express.Router();
const EspacioModel = require('../models/Espacio');
const UsuarioModel = require('../models/Usuario');

//endpoint para traer todas las recetas
rutas.get('/traerEspacios',async(req,res)=>{
    try{
        const espacio= await EspacioModel.find();
        res.json(espacio);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});
module.exports=rutas;

//endpoint 2 Crear
rutas.post('/crear',async(req,res)=>{
    const vehiculo=new VehiculoModel({
        estado: req.body.estado,
        tipopermitido: req.body.tipopermitido,
        ubicacion: req.body.ubicacion,
        usuario:req.body.usuario,
        vehiculo:req.body.vehiculo
         //asignar el id del usuario
        /*
        debido a que ingresamos sesion solo se guarda el ususario del que inicio sesion, a menos que se cambie la autenticacion, o token con el que queramos ingresas a la funcion crear
        debido a eso en este metodo se puede crear utilizando el id del cuerpo de postman dado, este anterior sirve mucho para lo que es controles de administracion o solo gerente y demas
        usuario:req.usuario._id */
    })
    console.log(espacio);
    try{
        const nuevoEspacio= await espacio.save();
        res.status(201).json(nuevoEspacio);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});
//endpoint 3 Editar
rutas.put('/editar/:id',async(req,res)=>{

    try{
        const espacioEditado= await EspacioModel.findByIdAndUpdate(req.params.id, req.body, {new :true});
        if(!espacioEditado)
            return res.status(404).json({mensaje:"Espacio no editado"});
        else
            return res.status(201).json(espacioEditado);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});
//endpoint 4 Eliminar
rutas.delete('/eliminar/:id',async(req,res)=>{

    try{
        const espacioEliminado = await EspacioModel.findByIdAndDelete(req.params.id) ;
        if(!espacioEliminado)
            return res.status(404).json({mensaje:"Espacio no Encontrado"});
        else
            return res.json({mensaje: 'Espacio Eliminado'});
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
});