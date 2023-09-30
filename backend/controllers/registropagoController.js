const registropago = require('../models/registropago');

const verificarMontoTope = (req,res)=>{
    const montoTope = 15600
    const datos = {idTrabajador:req.body.id_trabajador}
    registropago.verificarMontoTope(datos,(err,result,filed)=>{
        if(err){
            res.json("Error al verificar monto tope")
        }else{
            if(parseFloat(result[0].sueldoBruto)+parseFloat(req.body.inputMontoBruto)>montoTope){
                res.json({respuesta:"rechazado"})
            }else{
                res.json({respuesta:"aceptado"})
            }
        }
    })
}
const guardarNuevoRegistroPago = (req,res)=>{
    const id_planilla = req.body.id_planilla
    const inputNOFICURH = req.body.inputNOFICURH
    const inputPeriodoPagoDesde = req.body.inputPeriodoPagoDesde
    const inputPeriodoPagoHasta = req.body.inputPeriodoPagoHasta
    const inputMontoBruto = req.body.inputMontoBruto
    const inputDscto5ta = req.body.inputDscto5ta
    const inputMontoAbonar = req.body.inputMontoAbonar
    const inputNOFICFAC = req.body.inputNOFICFAC
    const inputMeta = req.body.inputMeta
    const id_trabajador = req.body.id_trabajador
    const inputDetalle = req.body.inputDetalle
    const inputDsctoJudic = req.body.inputDsctoJudic
    const datos ={
        id_planilla,
        inputNOFICURH,
        inputPeriodoPagoDesde,
        inputPeriodoPagoHasta,
        inputMontoBruto,
        inputDscto5ta,
        inputMontoAbonar,
        inputNOFICFAC,
        inputMeta,
        id_trabajador,
        inputDetalle,
        inputDsctoJudic
    }
    registropago.guardarNuevoRegistroPago(datos,(err,result,filed)=>{
        if(err){
            console.log(err);
            res.json("Error al guardar nuevo registro de pago")
        }else{
            res.json({respuesta:"registro de pago agregado"})
        }
    })
}
const eliminarRegistroPago = (req,res)=>{
    const idRegistroPago = req.params.idRegistroPago
    registropago.eliminarRegistroPago(idRegistroPago,(err,result,filed)=>{
        if(err){
            console.log(err);
            res.json("Error al eliminar registro de pago")
        }else{
            res.json({respuesta:"registro de pago eliminado"})
        }
    })
}
const obtenerRegistroPago = (req,res)=>{
    const idRegistroPago = req.params.idRegistroPago
    registropago.obtenerRegistroPago(idRegistroPago,(err,result,filed)=>{
        if(err){
            res.json("Error al obtener registro de pago")
        }else{
            res.json(result)
        }
    })
}
const editarRegistroPago = (req,res)=>{
    const inputIdEditarRegistroPago = req.body.datosEditarRegistroPago.inputIdEditarRegistroPago
    const inputNOFICURHEditarRegistroPago = req.body.datosEditarRegistroPago.inputNOFICURHEditarRegistroPago;
    const inputPeriodoPagoDesdeEditarRegistroPago = req.body.datosEditarRegistroPago.inputPeriodoPagoDesdeEditarRegistroPago;
    const inputPeriodoPagoHastaEditarRegistroPago = req.body.datosEditarRegistroPago.inputPeriodoPagoHastaEditarRegistroPago;
    const inputMontoBrutoEditarRegistroPago = req.body.datosEditarRegistroPago.inputMontoBrutoEditarRegistroPago;
    const inputDscto5taEditarRegistroPago = req.body.datosEditarRegistroPago.inputDscto5taEditarRegistroPago;
    const inputMontoAbonarEditarRegistroPago = req.body.datosEditarRegistroPago.inputMontoAbonarEditarRegistroPago;
    const inputNOFICFACEditarRegistroPago = req.body.datosEditarRegistroPago.inputNOFICFACEditarRegistroPago;
    const inputMetaEditarRegistroPago = req.body.datosEditarRegistroPago.inputMetaEditarRegistroPago;
    const inputDetalleEditarRegistroPago = req.body.datosEditarRegistroPago.inputDetalleEditarRegistroPago;
    const inputDsctoJudicEditarRegistroPago = req.body.datosEditarRegistroPago.inputDsctoJudicEditarRegistroPago;
    const datos = {
        inputIdEditarRegistroPago,inputNOFICURHEditarRegistroPago,inputPeriodoPagoDesdeEditarRegistroPago,
        inputPeriodoPagoHastaEditarRegistroPago,inputMontoBrutoEditarRegistroPago,inputDscto5taEditarRegistroPago,inputMontoAbonarEditarRegistroPago,
        inputNOFICFACEditarRegistroPago,inputMetaEditarRegistroPago,inputDetalleEditarRegistroPago,inputDsctoJudicEditarRegistroPago}
    registropago.editarRegistroPago(datos,(err,result,filed)=>{ 
        if(err){
            res.json("Error al editar registro de pago")
        }else{
            res.json({respuesta:"registro de pago editado"})
        }
    })
}


module.exports = {verificarMontoTope,guardarNuevoRegistroPago,eliminarRegistroPago,obtenerRegistroPago,editarRegistroPago}