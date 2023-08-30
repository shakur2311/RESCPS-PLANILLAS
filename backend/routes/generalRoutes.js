const express = require('express');
const router = express.Router();
const trabajadorController = require('../controllers/trabajadorController');
const planillaController = require('../controllers/planillaController');
const authController = require('../controllers/authController');
const load = require('../models/input') 
const planilla = require('../models/planilla')


router.get('/',(req,res)=>{
    res.render('./login.ejs');
})

/* Login */
router.get('/login',authController.index)
router.post('/login',authController.login)


/* Vistas */
router.get('/index',(req,res)=>{
    const usuario = req.session.usuario
    const rol = req.session.rol
    res.render('./index.ejs',{usuario: usuario,rol:rol})
})

router.get('/registrar-trabajador',async (req,res)=>{
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

    res.render('./registrarTrabajador.ejs',{
        regimenlaboral: regimenLaboral,
        condicionlaboral: condicionLaboral,
        nivelremunerativo: nivelRemunerativo,
        categoria: categoria
    })
})
router.get('/visualizador-planillas',(req,res)=>res.render('./visualizadorPlanillas.ejs'));
router.get('/planilla-rescps',(req,res)=>res.render('./planillaRESCPS.ejs'));
router.get('/registradorPago/:id_planilla',async (req,res)=>{
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
    planilla.obtenerPlanillaXId(id_planilla,(err,results,filed)=>{
        if(err){
            res.json({respuesta:'No se pudo obtener datos de planilla'})
        }else{
            res.render('./registradorPago.ejs',{results,regimenLaboralList})
        }
    })
    
});





module.exports = router;