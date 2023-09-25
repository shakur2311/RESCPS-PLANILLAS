const planilla = require('../models/planilla.js')

const obtenerPlanillas = (req,res)=>{
    const page = req.query.page;
    const itemsPerPage = 10; // Cambia esto según la cantidad de registros por página
    if(page==undefined){
        planilla.obtenerPlanillasTodas((err,results,filed)=>{
            if(err){
                console.log(err)
            }else{
                res.json(results)
            }
        })
    }else{
        const offset = (page - 1) * itemsPerPage;
        planilla.obtenerPlanillas(offset,itemsPerPage,(err,results,filed)=>{
            if(err){
                console.log(err)
                res.json(err)
            }else{
                res.json(results)
            }
        })
    }
    

    
}

const nuevaPlanilla = (req,res)=>{
    const nombrePlanilla=req.body.inputNombrePlanilla
    console.log(nombrePlanilla);
    planilla.nuevaPlanilla(nombrePlanilla,(err,results,filed)=>{
        if(err){
            console.log(err)
        }else{
            res.json({respuesta:"planilla agregada"})
        }
    })
}
const obtenerRegistrosPagosDetalladoXPlanilla = (req,res)=>{
    const id_planilla = req.params.id_planilla
    planilla.obtenerRegistrosPagosDetalladoXPlanilla(id_planilla,(err,results,filed)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log(err)
            res.json(results)
        }
    })
}
const obtenerRegistrosPagosConsolidadoXPlanilla = (req,res)=>{
    const id_planilla = req.params.id_planilla
    planilla.obtenerRegistrosPagosConsolidadoXPlanilla(id_planilla,(err,results,filed)=>{
        if(err){
            res.json(err)
        }else{
            res.json(results)
        }
    })
}


module.exports = {obtenerPlanillas,nuevaPlanilla,obtenerRegistrosPagosDetalladoXPlanilla,obtenerRegistrosPagosConsolidadoXPlanilla}