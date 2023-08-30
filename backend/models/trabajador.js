const connection = require('../libs/db_connection');

const trabajador = {
    obtenerTrabajadores: (fun)=>{
        const sql = `SELECT * FROM trabajadores t inner join regimenlaboral rl on t.id_regimen_laboral=rl.idRL`;
        connection.query(sql,fun);
    },
    nuevoTrabajador: (datosTrabajador,fun)=>{
        if(datosTrabajador.inputCondicionLaboral==0){
            datosTrabajador.inputCondicionLaboral=null;
        }else{
            datosTrabajador.inputCondicionLaboral = `'${datosTrabajador.inputCondicionLaboral}'`
        }
        if(datosTrabajador.inputNivelRemunerativo==0){
            datosTrabajador.inputNivelRemunerativo=null;
        }else{
            datosTrabajador.inputNivelRemunerativo = `'${datosTrabajador.inputNivelRemunerativo}'`
        }
        if(datosTrabajador.inputCategoria==0){
            datosTrabajador.inputCategoria=null;
        }else{
            datosTrabajador.inputCategoria = `'${datosTrabajador.inputCategoria}'`
        }
        if(datosTrabajador.inputDedicacion==0){
            datosTrabajador.inputDedicacion=null;
        }else{
            datosTrabajador.inputDedicacion = `'${datosTrabajador.inputDedicacion}'`
        }
        if(datosTrabajador.inputNivelRemunerativo1==0){
            datosTrabajador.inputNivelRemunerativo1=null;
        }else{
            datosTrabajador.inputNivelRemunerativo1 = `'${datosTrabajador.inputNivelRemunerativo1}'`
        }
        if(datosTrabajador.inputCategoria1==0){
            datosTrabajador.inputCategoria1=null;
        }else{
            datosTrabajador.inputCategoria1 = `'${datosTrabajador.inputCategoria1}'`
        }
        if(datosTrabajador.inputCategoria2==0){
            datosTrabajador.inputCategoria2=null;
        }else{
            datosTrabajador.inputCategoria2 = `'${datosTrabajador.inputCategoria2}'`
        }
        const sql = `INSERT INTO Trabajadores(id_regimen_laboral,
                     codigo,apepat,apemat,nombres,id_condicion_laboral,
                     id_nivel_remunerativo,id_categoria,dedicacion,nivelremunerativo,
                     sueldoBruto,categoria1,categoria2) 
                     VALUES(${datosTrabajador.inputRegimenLaboral},'${datosTrabajador.inputCodigo}','${datosTrabajador.inputApepat}',
                     '${datosTrabajador.inputApemat}','${datosTrabajador.inputNombres}',${datosTrabajador.inputCondicionLaboral},
                     ${datosTrabajador.inputNivelRemunerativo},${datosTrabajador.inputCategoria},${datosTrabajador.inputDedicacion},
                     ${datosTrabajador.inputNivelRemunerativo1},${datosTrabajador.inputSueldoBruto},${datosTrabajador.inputCategoria1},
                     ${datosTrabajador.inputCategoria2})`;
        connection.query(sql,fun)
    },
    obtenerTrabajadoresXRL: (idRL,fun)=>{
        const sql = `SELECT * FROM trabajadores where id_regimen_laboral=${idRL}`;
        connection.query(sql,fun);
    }
 
}

module.exports = trabajador;