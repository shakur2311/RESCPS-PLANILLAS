const connection = require('../libs/db_connection');


const load = {
    regimenLaboral: (fun)=>{
        const sql = `SELECT * FROM regimenlaboral`
        connection.query(sql,fun)
    },
    condicionLaboral: (fun)=>{
        const sql = `SELECT * FROM condicionlaboral`
        connection.query(sql,fun)
    },
    nivelRemunerativo: (fun)=>{
        const sql = `SELECT * FROM nivelremunerativo`
        connection.query(sql,fun)
    },
    categoria: (fun)=>{
        const sql = `SELECT * FROM categoria`
        connection.query(sql,fun)
    }

}



module.exports = load