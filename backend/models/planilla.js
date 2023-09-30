const connection = require('../libs/db_connection');

const planilla = {
    obtenerPlanillas: (offset,itemsPerPage,fun)=>{
        const query = `SELECT * FROM planillas order by id desc LIMIT ${offset}, ${itemsPerPage}`;

        connection.query(query, fun);
    },
    obtenerPlanillasTodas: (fun)=>{
        const query = `SELECT * FROM planillas where borrado=0 order by id desc`
        connection.query(query, fun)
    },
    nuevaPlanilla: (nombrePlanilla,fun)=>{
        const query = `INSERT INTO planillas(nombrePlanilla,borrado) values('${nombrePlanilla}',0)`
        connection.query(query,fun)
    },
    guardarNuevoRegistroPagoXPlanilla: (idPlanilla,fun)=>{
        const query = ``
        connection.query(query,fun)
    },
    obtenerPlanillaXId: (idPlanilla,fun)=>{
        const query = `SELECT * FROM planillas where id=${idPlanilla} and borrado=0`
        connection.query(query,fun)
    },
    obtenerRegistrosPagosDetalladoXPlanilla: (idPlanilla,fun)=>{
        const query = `SELECT t.codigo,rp.id, rp.id_planilla,t.nombres,t.apepat,t.apemat,rp.N_OFICURH,rl.nombreRL,
        rp.periodo_pagar_desde,rp.periodo_pagar_hasta,rp.montoBruto,rp.dsc5ta,rp.montoAbonar, rp.N_OFICFAC,rp.meta,
        rp.detalle,rp.dsctoJudicial,rp.fecha_creacion
        FROM registrospagos rp inner join trabajadores t on rp.id_trabajador=t.id
        inner join regimenlaboral rl on t.id_regimen_laboral = idRL 
        where rp.id_planilla=${idPlanilla} order by rp.id desc`
        connection.query(query,fun)
    },
    obtenerRegistrosPagosConsolidadoXPlanilla: (idPlanilla,fun)=>{
        const query = `SELECT t.codigo,t.nombres,t.apepat,t.apemat,SUM(rp.montoBruto) montoBruto,SUM(rp.dsc5ta) dscto,
        SUM(rp.montoAbonar) montoAbonar
        FROM registrospagos rp inner join trabajadores t on rp.id_trabajador=t.id
        where rp.id_planilla=${idPlanilla} GROUP BY id_trabajador`
        connection.query(query,fun)
    }
}


module.exports = planilla