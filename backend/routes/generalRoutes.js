const express = require('express');
const router = express.Router();
const trabajadorController = require('../controllers/trabajadorController');
const planillaController = require('../controllers/planillaController');
const authController = require('../controllers/authController');
const load = require('../models/input') ;
const planilla = require('../models/planilla');
const {isAuth} = require('../middlewares/isAuth');
const {isNotAuth} = require('../middlewares/isNotAuth');
const {isAdmin} = require('../middlewares/isAdmin');

router.get('/',(req,res)=>{
    res.redirect('/login');
})

/* Login */
router.get('/login',isNotAuth,authController.index)
router.post('/login',authController.login)
router.get('/logout',authController.logout)

/* Vistas */
router.get('/index',isAuth,(req,res)=>{
    const usuario = req.session.usuario
    const rol = req.session.rol
    res.render('./index.ejs',{usuario: usuario,rol:rol})
})

router.get('/registrar-trabajador',isAuth,isAdmin,async (req,res)=>{
    const regimenLaboral = await new Promise((resolve,reject)=>{
        load.regimenLaboral((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
    const condicionLaboral = await new Promise((resolve,reject)=>{
        load.condicionLaboral((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
    const nivelRemunerativo = await new Promise((resolve,reject)=>{
        load.nivelRemunerativo((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
    const categoria = await new Promise((resolve,reject)=>{
        load.categoria((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
    const facultad = await new Promise((resolve,reject)=>{
        load.facultad((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(result)
            }
        })
    })

    res.render('./registrarTrabajador.ejs',{
        regimenlaboral: regimenLaboral,
        condicionlaboral: condicionLaboral,
        nivelremunerativo: nivelRemunerativo,
        categoria: categoria,
        facultad: facultad
    })
})
router.get('/visualizador-planillas',isAuth,(req,res)=>res.render('./visualizadorPlanillas.ejs'));
router.get('/planilla-rescps',isAuth,(req,res)=>res.render('./planillaRESCPS.ejs'));
router.get('/registradorPago/:id_planilla',isAuth,async (req,res)=>{
    const id_planilla = req.params.id_planilla
    const regimenLaboralList = await new Promise((resolve,reject)=>{
        load.regimenLaboral((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
    const facultadList = await new Promise((resolve,reject)=>{
        load.facultad((err,result,filed)=>{
            if(err){
                console.log(err)
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
    planilla.obtenerPlanillaXId(id_planilla,(err,results,filed)=>{
        if(err){
            res.json({respuesta:'No se pudo obtener datos de planilla'})
        }else{
            res.render('./registradorPago.ejs',{results,regimenLaboralList,facultadList})
        }
    })
    
});





module.exports = router;