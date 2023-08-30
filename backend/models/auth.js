const connection = require('../libs/db_connection');

const auth = {
    obtenerUsuarios: (credenciales,fun) =>{
        const sql = `SELECT * FROM Usuarios where usuario='${credenciales.usuario}' 
        and contrasena='${credenciales.contrasena}' LIMIT 1`;
        connection.query(sql,fun)
    },

    logout: ()=>{

    }


    
}


module.exports = auth