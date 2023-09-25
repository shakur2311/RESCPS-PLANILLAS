const trabajador = require('../models/trabajador')

const index = (req,res)=>{
    trabajador.obtenerTrabajadores((err,result,filed)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({personas: result})
        }
    });
}


const nuevoTrabajador=(req,res)=>{
    const datosTrabajador = req.body.datosTrabajador
    trabajador.nuevoTrabajador(datosTrabajador,(err,result,filed)=>{
        if(err){
            console.log(err);
        }else{
            res.json({respuesta: "trabajador agregado"});
        }
    })
}
const obtenerTrabajadoresXRL =(req,res)=>{
    const idRL = req.params.idRL
    trabajador.obtenerTrabajadoresXRL(idRL,(err,result,filed)=>{
        if(err){
            console.log("Error al obtener trabajadores por Regimen Laboral")
            res.json("Error al obtener trabajadores por Regimen Laboral");
        }else{
            res.json({respuesta: result})
        }
    })
}
const obtenerTrabajadoresXFacultad = (req,res)=>{
    const id = req.params.id
    trabajador.obtenerTrabajadoresXFacultad(id,(err,result,filed)=>{
        if(err){
            console.log("Error al obtener trabajadores por Facultad")
            res.json("Error al obtener trabajadores por Facultad");
        }else{
            res.json({respuesta: result})
        }
    })
}
const obtenerTrabajador = (req,res)=>{
    const idTrabajador = req.params.idTrabajador
    trabajador.obtenerTrabajador(idTrabajador,(err,result,filed)=>{
        if(err){
            res.json("Error al obtener trabajador por id");
            console.log(err);
        }else{
            res.json({respuesta: result})
        }
    })
}
//Exportando funciones
module.exports = {
   index,nuevoTrabajador,obtenerTrabajadoresXRL,obtenerTrabajador,obtenerTrabajadoresXFacultad
}