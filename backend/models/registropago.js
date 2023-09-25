const connection = require('../libs/db_connection');

const registropago = {
    /* verificarMontoTope: (datos,fun)=>{
        const query = `SELECT SUM(montoBruto) montoBruto FROM registrospagos where id_planilla=${datos.idPlanilla} and 
        id_trabajador=${datos.idTrabajador} GROUP BY id_planilla, id_trabajador`;
        connection.query(query, fun);
    }, */
    verificarMontoTope: (datos,fun)=>{
        const query = `select * from trabajadores where id=${datos.idTrabajador}`;
        connection.query(query, fun);
    },
    guardarNuevoRegistroPago: (datos,fun)=>{
        const query = `INSERT INTO registrospagos(id_trabajador,id_planilla,N_OFICURH,periodo_pagar_desde,
            periodo_pagar_hasta,montoBruto,dsc5ta,montoAbonar,N_OFICFAC,meta,detalle) VALUES(
                '${datos.id_trabajador}','${datos.id_planilla}','${datos.inputNOFICURH}',
                '${datos.inputPeriodoPagoDesde}','${datos.inputPeriodoPagoHasta}','${datos.inputMontoBruto}',
                '${datos.inputDscto5ta}','${datos.inputMontoAbonar}','${datos.inputNOFICFAC}','${datos.inputMeta}',
                '${datos.inputDetalle}')`;
        connection.query(query, fun);
    },
    obtenerRegistroPago:(idRegistroPago,fun)=>{
        const query = `SELECT rp.*,t.codigo,t.apepat,t.apemat,t.nombres,p.nombrePlanilla FROM registrospagos rp INNER JOIN trabajadores t on rp.id_trabajador=t.id
        INNER JOIN planillas p on rp.id_planilla=p.id WHERE rp.id=${idRegistroPago}`;
        connection.query(query, fun);
    },
    eliminarRegistroPago: (idRegistroPago,fun)=>{
        const query = `DELETE FROM registrospagos WHERE id=${idRegistroPago}`;
        connection.query(query, fun);
    },
    editarRegistroPago:(datos,fun)=>{
        const query = `UPDATE registrospagos set N_OFICURH='${datos.inputNOFICURHEditarRegistroPago}',
        periodo_pagar_desde='${datos.inputPeriodoPagoDesdeEditarRegistroPago}',periodo_pagar_hasta='${datos.inputPeriodoPagoHastaEditarRegistroPago}',
        montoBruto='${datos.inputMontoBrutoEditarRegistroPago}',dsc5ta='${datos.inputDscto5taEditarRegistroPago}',montoAbonar='${datos.inputMontoAbonarEditarRegistroPago}',
        N_OFICFAC='${datos.inputNOFICFACEditarRegistroPago}',meta='${datos.inputMetaEditarRegistroPago}',detalle='${datos.inputDetalleEditarRegistroPago}' 
        WHERE id=${datos.inputIdEditarRegistroPago}`;
        connection.query(query, fun);
    }
}

module.exports = registropago