const registropago = require('../models/registropago');

const verificarMontoTope = (req,res)=>{
    const montoTope = 15600
    const datos = {idTrabajador:req.body.id_trabajador,
                   idPlanilla:req.body.id_planilla}
    registropago.verificarMontoTope(datos,(err,result,filed)=>{
        if(err){
            res.json("Error al verificar monto tope")
        }else{
            if(parseFloat(result[0].montoBruto)+parseFloat(req.body.inputMontoBruto)>montoTope){
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
    const inputFACDEP = req.body.inputFACDEP
    const inputPeriodoPagoDesde = req.body.inputPeriodoPagoDesde
    const inputPeriodoPagoHasta = req.body.inputPeriodoPagoHasta
    const inputSIAF = req.body.inputSIAF
    const inputMontoBruto = req.body.inputMontoBruto
    const inputDscto5ta = req.body.inputDscto5ta
    const inputMontoAbonar = req.body.inputMontoAbonar
    const inputNOFICFAC = req.body.inputNOFICFAC
    const inputMeta = req.body.inputMeta
    const inputNum = req.body.inputNum
    const id_trabajador = req.body.id_trabajador
    const inputDetalle = req.body.inputDetalle
    const datos ={
        id_planilla,
        inputNOFICURH,
        inputFACDEP,
        inputPeriodoPagoDesde,
        inputPeriodoPagoHasta,
        inputSIAF,
        inputMontoBruto,
        inputDscto5ta,
        inputMontoAbonar,
        inputNOFICFAC,
        inputMeta,
        inputNum,
        id_trabajador,
        inputDetalle
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


module.exports = {verificarMontoTope,guardarNuevoRegistroPago}