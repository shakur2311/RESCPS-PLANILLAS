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
//Exportando funciones
module.exports = {
   index,nuevoTrabajador,obtenerTrabajadoresXRL
}