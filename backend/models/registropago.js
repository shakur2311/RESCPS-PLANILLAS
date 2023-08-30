const connection = require('../libs/db_connection');

const registropago = {
    verificarMontoTope: (datos,fun)=>{
        const query = `SELECT SUM(montoBruto) montoBruto FROM registrospagos where id_planilla=${datos.idPlanilla} and 
        id_trabajador=${datos.idTrabajador} GROUP BY id_planilla, id_trabajador`;
        connection.query(query, fun);
    },
    guardarNuevoRegistroPago: (datos,fun)=>{
        const query = `INSERT INTO registrospagos(id_trabajador,id_planilla,N_OFICURH,FACoDEP,periodo_pagar_desde,
            periodo_pagar_hasta,SIAF,montoBruto,dsc5ta,montoAbonar,N_OFICFAC,meta,Num,detalle) VALUES(
                '${datos.id_trabajador}','${datos.id_planilla}','${datos.inputNOFICURH}','${datos.inputFACDEP}',
                '${datos.inputPeriodoPagoDesde}','${datos.inputPeriodoPagoHasta}','${datos.inputSIAF}','${datos.inputMontoBruto}',
                '${datos.inputDscto5ta}','${datos.inputMontoAbonar}','${datos.inputNOFICFAC}','${datos.inputMeta}','${datos.inputNum}',
                '${datos.inputDetalle}')`;
        connection.query(query, fun);
    }
}

module.exports = registropago