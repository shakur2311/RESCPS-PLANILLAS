const auth = require('../models/auth.js')


const index = (req,res)=>{
    res.render('./login.ejs')
}

const login = async (req,res)=>{
    try {
        var credenciales = {
            usuario: req.body.inputUsuario,
            contrasena: req.body.inputContrasena
        }
        const listaUsuarios = await new Promise((resolve, reject) => {
            auth.obtenerUsuarios(credenciales,(err, result, filed) => {
                if (err) {
                    console.log("Hubo un error obteniendo usuarios");
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    
        if(listaUsuarios!=null){
            req.session.usuario = listaUsuarios[0].usuario
            req.session.rol = listaUsuarios[0].rol
            res.redirect('./index')
        }
    } catch (error) {
        console.log(error)
    }
}

const logout = (req,res)=>{
    try {
        req.session.usuario 
        res.render('./login.ejs');
    } catch (error) {
        console.log(error);   
    }
}
//Exportando funciones
module.exports = {
   index,login,logout
}